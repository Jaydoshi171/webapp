const sequelize = require('../util/config')
const bcrypt = require("bcrypt");
const Account = require('../models/Account')

async function basicAuth(req, res, next) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' }).send();
    }
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    const account = await Account.findOne({ where: { email: email}});
    const result = await bcrypt.compareSync(password,account.password);
    if (!result) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' }).send();
    }
    req.account = account
    next();
}

module.exports = basicAuth;
