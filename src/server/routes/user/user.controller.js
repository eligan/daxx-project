const { userService, responseService } = require('../../services');

const controller = {
    getUsersList: async (ctx) => {
        const params = ctx.request.query;
        const list = await userService.getUsersList(params);
        throw new Error('fuuck');
        return responseService.ok(ctx, list);
    },
    createUser: async (ctx) => {
        const data = ctx.request.body;
        const isUserExists = await userService.isUserExists(data.email);
        if (isUserExists) {
            return responseService.alreadyExists(ctx, 'User with provided email already exists');
        }
        const user = await userService.createUser(data);
        return responseService.ok(ctx, user);
    },
    getUser: async (ctx) => {
        const { userId } = ctx.params;
        const user = await userService.getUserById(userId);
        if (!user) {
            return responseService.notFound(ctx, 'User with provided id is not found');
        }
        return responseService.ok(ctx, user);
    },
    updateUser: async (ctx) => {
        const { userId } = ctx.params;
        const user = await userService.getUserById(userId);
        if (!user) {
            return responseService.badRequest(ctx, 'Can not update not existing user');
        }
        const data = ctx.request.body;
        const updatedUser = await userService.updateUserById(userId, data);
        return responseService.ok(ctx, updatedUser);
    },
    deleteUser: async (ctx) => {
        const { userId } = ctx.params;
        const user = await userService.getUserById(userId);
        if (!user) {
            return responseService.badRequest(ctx, 'Can not delete not existing user');
        }
        await userService.deleteUserById(userId);
        return responseService.ok(ctx);
    },
};

module.exports = controller;
