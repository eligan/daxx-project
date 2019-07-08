module.exports = {
    $id: 'user.list',
    type: 'object',
    additionalProperties: false,
    properties: {
        email: {
            type: 'string',
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
