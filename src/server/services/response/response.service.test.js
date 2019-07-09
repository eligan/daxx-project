const service = require('./response.service');
const codes = require('./response.codes');

describe('src/server/services/response', () => {
    describe('.ok()', () => {
        it('Should set code to codes.OK and no body by default', async () => {
            const ctx = {};
            const result = service.ok(ctx);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.OK);
            expect(result.body).toEqual(undefined);
        });
        it('Should set code to codes.OK and provided body', async () => {
            const ctx = {};
            const body = {};
            const result = service.ok(ctx, body);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.OK);
            expect(result.body).toEqual(body);
        });
        it('Should throw typeError if called without ctx', async () => {
            try {
                service.ok(undefined);
            } catch (err) {
                expect(err.message).toEqual('Cannot set property \'status\' of undefined');
                expect(err.name).toEqual('TypeError');
            }
        });
    });
    describe('.badRequest()', () => {
        it('Should set code to codes.BAD_REQUEST and error body with default message', async () => {
            const ctx = {};
            const defaultMessage = 'Bad Request';
            const result = service.badRequest(ctx);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.BAD_REQUEST);
            expect(result.body).toEqual({
                error: {
                    code: codes.BAD_REQUEST,
                    status: 'BAD_REQUEST',
                    message: defaultMessage,
                },
            });
        });
        it('Should set code to codes.BAD_REQUEST and error body with provided message', async () => {
            const ctx = {};
            const providedMessage = 'test';
            const result = service.badRequest(ctx, providedMessage);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.BAD_REQUEST);
            expect(result.body).toEqual({
                error: {
                    code: codes.BAD_REQUEST,
                    status: 'BAD_REQUEST',
                    message: providedMessage,
                },
            });
        });
        it('Should throw typeError if called without ctx', async () => {
            try {
                service.badRequest(undefined);
            } catch (err) {
                expect(err.message).toEqual('Cannot set property \'status\' of undefined');
                expect(err.name).toEqual('TypeError');
            }
        });
    });
    describe('.notFound()', () => {
        it('Should set code to codes.NOT_FOUND and error body with default message', async () => {
            const ctx = {};
            const defaultMessage = 'Not Found';
            const result = service.notFound(ctx);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.NOT_FOUND);
            expect(result.body).toEqual({
                error: {
                    code: codes.NOT_FOUND,
                    status: 'NOT_FOUND',
                    message: defaultMessage,
                },
            });
        });
        it('Should set code to codes.NOT_FOUND and error body with provided message', async () => {
            const ctx = {};
            const providedMessage = 'test';
            const result = service.notFound(ctx, providedMessage);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.NOT_FOUND);
            expect(result.body).toEqual({
                error: {
                    code: codes.NOT_FOUND,
                    status: 'NOT_FOUND',
                    message: providedMessage,
                },
            });
        });
        it('Should throw typeError if called without ctx', async () => {
            try {
                service.notFound(undefined);
            } catch (err) {
                expect(err.message).toEqual('Cannot set property \'status\' of undefined');
                expect(err.name).toEqual('TypeError');
            }
        });
    });
    describe('.alreadyExists()', () => {
        it('Should set code to codes.ALREADY_EXISTS and error body with default message', async () => {
            const ctx = {};
            const defaultMessage = 'Already Exists';
            const result = service.alreadyExists(ctx);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.ALREADY_EXISTS);
            expect(result.body).toEqual({
                error: {
                    code: codes.ALREADY_EXISTS,
                    status: 'ALREADY_EXISTS',
                    message: defaultMessage,
                },
            });
        });
        it('Should set code to codes.ALREADY_EXISTS and error body with provided message', async () => {
            const ctx = {};
            const providedMessage = 'test';
            const result = service.alreadyExists(ctx, providedMessage);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.ALREADY_EXISTS);
            expect(result.body).toEqual({
                error: {
                    code: codes.ALREADY_EXISTS,
                    status: 'ALREADY_EXISTS',
                    message: providedMessage,
                },
            });
        });
        it('Should throw typeError if called without ctx', async () => {
            try {
                service.alreadyExists(undefined);
            } catch (err) {
                expect(err.message).toEqual('Cannot set property \'status\' of undefined');
                expect(err.name).toEqual('TypeError');
            }
        });
    });
    describe('.internalError()', () => {
        it('Should set code to codes.INTERNAL and error body with default message', async () => {
            const ctx = {};
            const defaultMessage = 'Internal Error';
            const result = service.internalError(ctx);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.INTERNAL);
            expect(result.body).toEqual({
                error: {
                    code: codes.INTERNAL,
                    status: 'INTERNAL',
                    message: defaultMessage,
                },
            });
        });
        it('Should set code to codes.INTERNAL and error body with provided message', async () => {
            const ctx = {};
            const providedMessage = 'test';
            const result = service.internalError(ctx, providedMessage);
            expect(result).toEqual(ctx);
            expect(result.status).toEqual(codes.INTERNAL);
            expect(result.body).toEqual({
                error: {
                    code: codes.INTERNAL,
                    status: 'INTERNAL',
                    message: providedMessage,
                },
            });
        });
        it('Should throw typeError if called without ctx', async () => {
            try {
                service.internalError(undefined);
            } catch (err) {
                expect(err.message).toEqual('Cannot set property \'status\' of undefined');
                expect(err.name).toEqual('TypeError');
            }
        });
    });
});
