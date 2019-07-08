const config = require('config');

const regExpList = config.get('regExpList');

module.exports = {
    $id: 'user.update',
    type: 'object',
    additionalProperties: false,
    properties: {
        password: {
            type: 'string',
            pattern: regExpList.password,
            maxLength: 8,
            minLength: 8,
        },
        firstName: {
            type: 'string',
            maxLength: 25,
        },
        lastName: {
            type: 'string',
            maxLength: 25,
        },
        city: {
            ype: 'string',
            maxLength: 25,
        },
    },
};
