const sequelize = require('../util/config')
const bcrypt = require("bcrypt");
const Account = require('../models/Account')
const logger = require("../util/logger");

async function basicAuth(req, res, next) {
    // if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    //     // console.error(err);
    //     return res.status(400).send({ status: 404}); // Bad request
    // }
    try{
        await sequelize.authenticate();
    }
    catch{
        logger.error("Connection with database failed");
        res.status(503).send();
    }

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' }).send();
    }
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    const account = await Account.findOne({ where: { email: email}});
    if (!account) {
        logger.error("Authentication failed");
        return res.status(401).json({ message: 'Invalid Authentication Credentials' }).send();
    }
    const result = await bcrypt.compareSync(password,account.password);
    if (!result) {
        logger.error("Authentication failed");
        return res.status(401).json({ message: 'Invalid Authentication Credentials' }).send();
    }
    req.account = account
    next();
}

module.exports = basicAuth;
