/* eslint-disable consistent-return */
const { responseService } = require('../services');

module.exports = async (ctx, next) => {
    try {
        await next();

        if (!ctx.body && (!ctx.status || ctx.status === 404)) {
            return responseService.notFound(ctx, 'Unknown endpoint');
        }
    } catch (err) {
        const message = `Internal error: ${err.message}\n ${err.stack}`;
        return responseService.internalError(ctx, message);
    }
};
