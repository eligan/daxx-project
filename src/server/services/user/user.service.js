const crypto = require('crypto');
const config = require('config');

const { User } = require('../../db').models;

const service = {
    createUser: async (userData, opts = {}) => {
        const passwordHash = service.getPasswordHash(userData.password);
        const preparedUserData = { ...userData, password: passwordHash };
        const userDoc = await User.create(preparedUserData);
        if (opts.raw) {
            return userDoc;
        }
        const baseProjection = service.getBaseProjection();
        return User
            .findById(userDoc.id, baseProjection)
            .exec();
    },
    updateUserById: async (userId, userData, opts = {}) => {
        const update = { ...userData, updatedAt: Date.now() };
        if (update.password) {
            update.password = service.getPasswordHash(update.password);
        }
        const query = User.findByIdAndUpdate(userId, update, { new: true });
        if (opts.raw) {
            return query.exec();
        }
        const baseProjection = service.getBaseProjection();
        query.projection(baseProjection);
        return query.exec();
    },
    getUsersList: async (params = {}, opts = {}) => {
        const conditions = {};
        Object.keys(params).forEach((key) => {
            conditions[key] = new RegExp(params[key], 'i');
        });
        const query = User.find(conditions);
        if (opts.raw) {
            return query.exec();
        }
        const baseProjection = service.getBaseProjection();
        query.projection(baseProjection);
        return query.exec();
    },
    getUserById: async (userId, opts = {}) => {
        const query = User.findById(userId);
        if (opts.raw) {
            return query.exec();
        }
        const baseProjection = service.getBaseProjection();
        query.projection(baseProjection);
        return query.exec();
    },
    deleteUserById: async (userId, opts = {}) => {
        const query = User.findByIdAndDelete(userId);
        if (opts.raw) {
            return query.exec();
        }
        const baseProjection = service.getBaseProjection();
        query.projection(baseProjection);
        return query.exec();
    },
    isUserExists: async userEmail => User.exists({ email: userEmail }),
    getPasswordHash: (password) => {
        const hashing = config.get('hashing');
        return crypto
            .pbkdf2Sync(password, hashing.salt, hashing.iterations, hashing.length, hashing.digest)
            .toString('hex');
    },
    getBaseProjection: () => ({
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        password: 0,
    }),
};

module.exports = service;
