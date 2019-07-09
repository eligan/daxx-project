const sinon = require('sinon');

const { userService, responseService } = require('../../services');
const controller = require('./user.controller');

describe('src/server/services/user', () => {
    const sandbox = sinon.createSandbox();

    beforeAll(() => {
        const fakeFn = (...params) => Promise.resolve(...params);
        sandbox.stub(userService, 'getUsersList')
            .callsFake(fakeFn);
        sandbox.stub(userService, 'createUser')
            .callsFake(fakeFn);
        sandbox.stub(userService, 'getUserById')
            .withArgs('passUserId')
            .resolves({})
            .withArgs('failUserId')
            .resolves(null);
        sandbox.stub(userService, 'updateUserById')
            .callsFake(fakeFn);
        sandbox.stub(userService, 'deleteUserById')
            .callsFake(fakeFn);
        sandbox.stub(userService, 'isUserExists')
            .withArgs('pass@test.com')
            .resolves(false)
            .withArgs('fail@test.com')
            .resolves(true);

        sandbox.stub(responseService, 'ok')
            .callsFake(fakeFn);
        sandbox.stub(responseService, 'badRequest')
            .callsFake(fakeFn);
        sandbox.stub(responseService, 'notFound')
            .callsFake(fakeFn);
        sandbox.stub(responseService, 'alreadyExists')
            .callsFake(fakeFn);
        sandbox.stub(responseService, 'internalError')
            .callsFake(fakeFn);
    });

    afterAll(() => {
        sandbox.restore();
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    describe('.getUsersList()', () => {
        it('Should call .getUsersList() with query as params', async () => {
            const testCtx = {
                request: {
                    query: {
                        key: 'value',
                    },
                },
            };
            await controller.getUsersList(testCtx);

            expect(userService.getUsersList.callCount).toBe(1);
            const [params] = userService.getUsersList.getCall(0).args;
            expect(params).toEqual(testCtx.request.query);

            expect(responseService.ok.callCount).toBe(1);
            const [calledCtx, calledBody] = responseService.ok.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
            expect(calledBody).toEqual(testCtx.request.query);
        });
    });
    describe('.createUser()', () => {
        it('Should call .isUserExists() with user email and .createUser()', async () => {
            const testUser = {
                email: 'pass@test.com',
                password: 'test',
                firstName: 'test',
                lastName: 'test',
                city: 'test',
            };
            const testCtx = {
                request: {
                    body: testUser,
                },
            };
            await controller.createUser(testCtx);

            expect(userService.isUserExists.callCount).toBe(1);
            let [params] = userService.isUserExists.getCall(0).args;
            expect(params).toEqual(testUser.email);

            expect(userService.createUser.callCount).toBe(1);
            [params] = userService.createUser.getCall(0).args;
            expect(params).toEqual(testUser);

            expect(responseService.ok.callCount).toBe(1);
            const [calledCtx, calledBody] = responseService.ok.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
            expect(calledBody).toEqual(testUser);
        });
        it('Should call .isUserExists() with existing user email and should not call .createUser()', async () => {
            const testUser = {
                email: 'fail@test.com',
                password: 'test',
                firstName: 'test',
                lastName: 'test',
                city: 'test',
            };
            const testCtx = {
                request: {
                    body: testUser,
                },
            };
            await controller.createUser(testCtx);

            expect(userService.isUserExists.callCount).toBe(1);
            const [params] = userService.isUserExists.getCall(0).args;
            expect(params).toEqual(testUser.email);

            expect(userService.createUser.callCount).toBe(0);

            expect(responseService.alreadyExists.callCount).toBe(1);
            const [calledCtx, calledMessage] = responseService.alreadyExists.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
            expect(calledMessage).toEqual('User with provided email already exists');
        });
    });
    describe('.getUser()', () => {
        it('Should call .getUserById() with :userId path param', async () => {
            const testCtx = {
                params: {
                    userId: 'passUserId',
                },
            };
            const expectedBody = {};
            await controller.getUser(testCtx);

            expect(userService.getUserById.callCount).toBe(1);
            const [params] = userService.getUserById.getCall(0).args;
            expect(params).toEqual(testCtx.params.userId);

            expect(responseService.ok.callCount).toBe(1);
            const [calledCtx, calledBody] = responseService.ok.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
            expect(calledBody).toEqual(expectedBody);
        });
        it('Should call .getUserById() with not existing :userId path param', async () => {
            const testCtx = {
                params: {
                    userId: 'failUserId',
                },
            };
            await controller.getUser(testCtx);

            expect(userService.getUserById.callCount).toBe(1);
            const [params] = userService.getUserById.getCall(0).args;
            expect(params).toEqual(testCtx.params.userId);

            expect(responseService.notFound.callCount).toBe(1);
            const [calledCtx, calledMessage] = responseService.notFound.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
            expect(calledMessage).toEqual('User with provided id is not found');
        });
    });
    describe('.updateUser()', () => {
        it('Should call .getUserById() with :userId path param and update data from body', async () => {
            const testUpdate = {
                password: 'test',
                firstName: 'test',
                lastName: 'test',
                city: 'test',
            };
            const testCtx = {
                params: {
                    userId: 'passUserId',
                },
                request: {
                    body: testUpdate,
                },
            };
            await controller.updateUser(testCtx);

            expect(userService.getUserById.callCount).toBe(1);
            const [params] = userService.getUserById.getCall(0).args;
            expect(params).toEqual(testCtx.params.userId);

            expect(userService.updateUserById.callCount).toBe(1);
            const [calledUserId, calledUpdate] = userService.updateUserById.getCall(0).args;
            expect(calledUserId).toEqual(testCtx.params.userId);
            expect(calledUpdate).toEqual(testUpdate);

            expect(responseService.ok.callCount).toBe(1);
            const [calledCtx] = responseService.ok.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
        });
        it('Should call .getUserById() with not existing :userId path param', async () => {
            const testUpdate = {
                password: 'test',
                firstName: 'test',
                lastName: 'test',
                city: 'test',
            };
            const testCtx = {
                params: {
                    userId: 'failUserId',
                },
                request: {
                    body: testUpdate,
                },
            };
            await controller.updateUser(testCtx);

            expect(userService.getUserById.callCount).toBe(1);
            const [params] = userService.getUserById.getCall(0).args;
            expect(params).toEqual(testCtx.params.userId);

            expect(userService.updateUserById.callCount).toBe(0);

            expect(responseService.badRequest.callCount).toBe(1);
            const [calledCtx, calledMessage] = responseService.badRequest.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
            expect(calledMessage).toEqual('Can not update not existing user');
        });
    });
    describe('.deleteUser()', () => {
        it('Should call .getUserById() with :userId path param and .deleteUserById()', async () => {
            const testCtx = {
                params: {
                    userId: 'passUserId',
                },
            };

            await controller.deleteUser(testCtx);

            expect(userService.getUserById.callCount).toBe(1);
            const [params] = userService.getUserById.getCall(0).args;
            expect(params).toEqual(testCtx.params.userId);

            expect(userService.deleteUserById.callCount).toBe(1);
            const [calledUserId] = userService.deleteUserById.getCall(0).args;
            expect(calledUserId).toEqual(testCtx.params.userId);

            expect(responseService.ok.callCount).toBe(1);
            const [calledCtx, calledBody] = responseService.ok.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
            expect(calledBody).toEqual(undefined);
        });
        it('Should call .getUserById() with not existing :userId path param', async () => {
            const testCtx = {
                params: {
                    userId: 'failUserId',
                },
            };

            await controller.deleteUser(testCtx);

            expect(userService.getUserById.callCount).toBe(1);
            const [params] = userService.getUserById.getCall(0).args;
            expect(params).toEqual(testCtx.params.userId);

            expect(userService.deleteUserById.callCount).toBe(0);

            expect(responseService.badRequest.callCount).toBe(1);
            const [calledCtx, calledMessage] = responseService.badRequest.getCall(0).args;
            expect(calledCtx).toEqual(testCtx);
            expect(calledMessage).toEqual('Can not delete not existing user');
        });
    });
});
