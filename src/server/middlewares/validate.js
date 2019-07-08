const Ajv = require('ajv');

const schemas = require('../schemas');
const { responseService } = require('../services');

const ajv = new Ajv({
    allErrors: true,
    removeAdditional: true,
    schemas,
});

function transformErrors(errs) {
    return errs.reduce((message, next) => `${message}${next.dataPath} - ${next.message}; `, '');
}

module.exports = (bodySchemaId, querySchemaId) => async (ctx, next) => {
    if (bodySchemaId) {
        const validate = ajv.getSchema(bodySchemaId);
        const isValid = validate(ctx.request.body);
        if (!isValid) {
            return responseService.badRequest(ctx, `Validation failed: ${transformErrors(validate.errors)}`);
        }
    }
    if (querySchemaId) {
        const validate = ajv.getSchema(querySchemaId);
        const isValid = validate(ctx.request.query);
        if (!isValid) {
            return responseService.badRequest(ctx, `Validation failed: ${transformErrors(validate.errors)}`);
        }
    }
    return next();
};
