const sinon = require('sinon');
const mongoose = require('mongoose');

const service = require('./user.service');

describe('src/server/services/user', () => {
    const sandbox = sinon.createSandbox();

    beforeAll(() => {
        const fakeFn = (...params) => ({
            exec: () => Promise.resolve(...params),
            projection: () => {},
        });
        sandbox.stub(mongoose.Model, 'findById').callsFake(fakeFn);
        sandbox.stub(mongoose.Model, 'find').callsFake(fakeFn);
        sandbox.stub(mongoose.Model, 'findByIdAndUpdate').callsFake(fakeFn);
        sandbox.stub(mongoose.Model, 'findByIdAndDelete').callsFake(fakeFn);
        sandbox.stub(mongoose.Model, 'exists').returns(false);
        sandbox.stub(mongoose.Model, 'create').callsFake((...params) => Promise.resolve(...params));
    });

    afterAll(() => {
        sandbox.restore();
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    describe('.createUser()', () => {
        it('Should call .create() and .findById by default', async () => {
            const testUser = {
                email: 'romanliuk@gmail.com',
                password: 'Hello123',
                firstName: 'roman',
                lastName: 'liuk',
                city: 'kiev',
            };
            const hashedPsw = service.getPasswordHash(testUser.password);

            await service.createUser(testUser);

            expect(mongoose.Model.create.callCount).toBe(1);
            expect(mongoose.Model.findById.callCount).toBe(1);
            const [createParams] = mongoose.Model.create.getCall(0).args;
            expect(createParams).toEqual({
                ...testUser,
                password: hashedPsw,
            });
        });
        it('Should call .create() and not .findById with raw=true', async () => {
            const testUser = {
                email: 'romanliuk@gmail.com',
                password: 'Hello123',
                firstName: 'roman',
                lastName: 'liuk',
                city: 'kiev',
            };
            const hashedPsw = service.getPasswordHash(testUser.password);

            const result = await service.createUser(testUser, { raw: true });

            expect(result).toEqual({
                ...testUser,
                password: hashedPsw,
            });
            expect(mongoose.Model.create.callCount).toBe(1);
            expect(mongoose.Model.findById.callCount).toBe(0);
            const [createParams] = mongoose.Model.create.getCall(0).args;
            expect(createParams).toEqual({
                ...testUser,
                password: hashedPsw,
            });
        });
    });
    describe('.updateUserById()', () => {
        it('Should call .findByIdAndUpdate() with provided userId and update, without password', async () => {
            const testUpdate = {
                firstName: 'roman',
                lastName: 'liuk',
                city: 'kiev',
            };
            const testUserId = 'test';

            await service.updateUserById(testUserId, testUpdate);

            expect(mongoose.Model.findByIdAndUpdate.callCount).toBe(1);
            const [
                calledUserId,
                {
                    updatedAt,
                    ...calledUpdate
                },
            ] = mongoose.Model.findByIdAndUpdate.getCall(0).args;
            expect(typeof updatedAt).toBe('number');
            expect(calledUserId).toEqual(testUserId);
            expect(calledUpdate).toEqual({
                ...testUpdate,
            });
        });
        it('Should call .findByIdAndUpdate() with provided userId and update, with password', async () => {
            const testUpdate = {
                password: 'test',
                firstName: 'roman',
                lastName: 'liuk',
                city: 'kiev',
            };
            const testUserId = 'test';
            const hashedPsw = service.getPasswordHash(testUpdate.password);

            await service.updateUserById(testUserId, testUpdate);

            expect(mongoose.Model.findByIdAndUpdate.callCount).toBe(1);
            const [
                calledUserId,
                {
                    updatedAt,
                    ...calledUpdate
                },
            ] = mongoose.Model.findByIdAndUpdate.getCall(0).args;
            expect(typeof updatedAt).toBe('number');
            expect(calledUserId).toEqual(testUserId);
            expect(calledUpdate).toEqual({
                ...testUpdate,
                password: hashedPsw,
            });
        });
        it('Should call .findByIdAndUpdate() with provided userId and update, with raw=true', async () => {
            const testUpdate = {
                firstName: 'roman',
                lastName: 'liuk',
                city: 'kiev',
            };
            const testUserId = 'test';

            await service.updateUserById(testUserId, testUpdate, { raw: true });

            expect(mongoose.Model.findByIdAndUpdate.callCount).toBe(1);
            const [
                calledUserId,
                {
                    updatedAt,
                    ...calledUpdate
                },
            ] = mongoose.Model.findByIdAndUpdate.getCall(0).args;
            expect(typeof updatedAt).toBe('number');
            expect(calledUserId).toEqual(testUserId);
            expect(calledUpdate).toEqual(testUpdate);
        });
    });
    describe('.getUsersList()', () => {
        it('Should call .find() with provided conditions', async () => {
            const testParams = {
                key1: 'value1',
                key2: 'value2',
            };
            const expectedConditions = {
                key1: new RegExp('value1', 'i'),
                key2: new RegExp('value2', 'i'),
            };

            await service.getUsersList(testParams);

            expect(mongoose.Model.find.callCount).toBe(1);
            const [calledConditions] = mongoose.Model.find.getCall(0).args;
            expect(calledConditions).toEqual(expectedConditions);
        });
        it('Should call .find() with empty conditions object when params not provided', async () => {
            const expectedConditions = {};

            await service.getUsersList();

            expect(mongoose.Model.find.callCount).toBe(1);
            const [calledConditions] = mongoose.Model.find.getCall(0).args;
            expect(calledConditions).toEqual(expectedConditions);
        });
    });
    describe('.getUserById()', () => {
        it('Should call .findById() with provided userId', async () => {
            const testUserId = 'test';

            await service.getUserById(testUserId);

            expect(mongoose.Model.findById.callCount).toBe(1);
            const [calledUserId] = mongoose.Model.findById.getCall(0).args;
            expect(calledUserId).toEqual(testUserId);
        });
    });
    describe('.deleteUserById()', () => {
        it('Should call .findByIdAndDelete() with provided userId', async () => {
            const testUserId = 'test';

            await service.deleteUserById(testUserId);

            expect(mongoose.Model.findByIdAndDelete.callCount).toBe(1);
            const [calledUserId] = mongoose.Model.findByIdAndDelete.getCall(0).args;
            expect(calledUserId).toEqual(testUserId);
        });
    });
    describe('.isUserExists()', () => {
        it('Should call .exists() with provided userId and return false', async () => {
            const testEmail = 'test@test.com';
            const expectedParams = { email: testEmail };

            const result = await service.isUserExists(testEmail);

            expect(result).toEqual(false);
            expect(mongoose.Model.exists.callCount).toBe(1);
            const [params] = mongoose.Model.exists.getCall(0).args;
            expect(params).toEqual(expectedParams);
        });
    });
});
