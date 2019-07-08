const mongoose = require('mongoose');
const config = require('config');
const User = require('./models/User.model');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    connect: async () => mongoose.connect(config.get('dbUrl')),
    models: {
        User,
    },
};
