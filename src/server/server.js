const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger')
const config = require('config');

const db = require('./db');
const router = require('./routes')();

const server = new Koa();

server
    .use(logger())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

(async () => {
    try {
        await db.connect();
    } catch (err) {
        console.log(`Database connection failed: ${err.toString()}`);
        process.exit(1);
    }
    server.listen(config.get('serverPort'), () => {
        console.log(`Server is listening to http://localhost:${config.get('serverPort')}`);
    });
})();
