// const env = require('dotenv');
// env.config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const url = require('url');
const sequelize = require('./util/config')
const Account = require('./models/Account')
const populateData = require('./util/populateDB');
const auth = require('./controllers/authentication');
const bodyParserErrorHandler = require('express-body-parser-error-handler')
const logger = require("./util/logger");
const StatsD =  require("node-statsd");
const statsd = new StatsD({ host: "localhost", port: 8125 });

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParserErrorHandler());
app.use('',require('./routes/assignment_routes'));

app.get('/healthz',async (req, res) => {
    try {
        statsd.increment("endpoint.get.healthCheck");
        const url_params = url.parse(req.url, true);
        if ((req.body && Object.keys(req.body).length > 0) || (Object.keys(url_params.query).length > 0)){
            logger.error("Invalid health check request");
            res.setHeader('Cache-control','no-cache, no-store, must-revalidate');
            res.setHeader('Pragma','no-cache');
            res.setHeader('X-Content-Type-Options','nosniff');
            res.status(400).send();
        }
        else{
            await sequelize.authenticate();
            logger.info("Health check Successful");
            res.setHeader('Cache-control','no-cache, no-store, must-revalidate');
            res.setHeader('Pragma','no-cache');
            res.setHeader('X-Content-Type-Options','nosniff');
            res.status(200).send();
        }
       
    } catch (error) {
        logger.error("Database not connected");
        res.setHeader('Cache-control','no-cache, no-store, must-revalidate');
        res.setHeader('Pragma','no-cache');
        res.setHeader('X-Content-Type-Options','nosniff');
        res.status(503).send();
    }
});

app.all('/healthz',(req, res) => {
        res.setHeader('Cache-control','no-cache, no-store, must-revalidate;');
        res.setHeader('Pragma','no-cache');
        res.setHeader('X-Content-Type-Options','nosniff');
        res.status(405).send();
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
