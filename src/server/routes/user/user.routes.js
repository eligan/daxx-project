const controller = require('./user.controller');
const { validate, validateObjectId } = require('../../middlewares');

module.exports = (Router) => {
    const router = new Router({
        prefix: '/users',
    });

    router
        .get('/', validate(undefined, 'user.list'), controller.getUsersList)
        .post('/', validate('user.create'), controller.createUser)
        .get('/:userId', validateObjectId('userId'), controller.getUser)
        .patch('/:userId', validateObjectId('userId'), validate('user.update'), controller.updateUser)
        .delete('/:userId', validateObjectId('userId'), controller.deleteUser);

    return router;
};
