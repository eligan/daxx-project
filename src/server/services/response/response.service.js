const responseCodes = require('./response.codes');

const service = {
    ok: (ctx, body) => {
        ctx.status = responseCodes.OK;
        ctx.body = body;
        return ctx;
    },
    badRequest: (ctx, message = 'Bad Request') => {
        ctx.status = responseCodes.BAD_REQUEST;
        ctx.body = {
            error: {
                code: responseCodes.BAD_REQUEST,
                status: 'BAD_REQUEST',
                message,
            },
        };
        return ctx;
    },
    notFound: (ctx, message = 'Not Found') => {
        ctx.status = responseCodes.NOT_FOUND;
        ctx.body = {
            error: {
                code: responseCodes.NOT_FOUND,
                status: 'NOT_FOUND',
                message,
            },
        };
        return ctx;
    },
    alreadyExists: (ctx, message = 'Already Exists') => {
        ctx.status = responseCodes.ALREADY_EXISTS;
        ctx.body = {
            error: {
                code: responseCodes.ALREADY_EXISTS,
                status: 'ALREADY_EXISTS',
                message,
            },
        };
        return ctx;
    },
    internalError: (ctx, message = 'Internal Error') => {
        ctx.status = responseCodes.INTERNAL;
        ctx.body = {
            error: {
                code: responseCodes.INTERNAL,
                status: 'INTERNAL',
                message,
            },
        };
        return ctx;
    },
};

module.exports = service;
