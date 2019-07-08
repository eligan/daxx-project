module.exports = {
    dbUrl: 'mongodb://localhost:27017/daxx-project',
    serverPort: 3000,
    hashing: {
        salt: 'DAXX',
        iterations: 10000,
        length: 64,
        digest: 'sha512',
    },
    regExpList: {
        email: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
        password: '^([\\w\\d]*[A-Z][\\w\\d]*)$',
        mongoId: '^(?=(?:.{12}|.{24})$)[0-9a-fA-F]*$',
    },
};
