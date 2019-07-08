const config = require('config');

const { responseService } = require('../services');

const regExpList = config.get('regExpList');

module.exports = paramName => async (ctx, next) => {
    const value = ctx.params[paramName];
    const isValid = (new RegExp(regExpList.mongoId)).test(value);
    if (!isValid) {
        return responseService.badRequest(ctx, `Validation failed: Invalid ObjectId route parameter ${paramName}`);
    }
    return next();
};
