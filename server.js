const express = require('express');
const bodyParser = require('body-parser');
// import routes from './routes/assignment_routes'

let base64 = require('base-64');

const app = express();
const port = 3000;

const sequelize = require('./util/config')
const Account = require('./models/Account')
const populateData = require('./util/populateDB');
const auth = require('./controllers/authentication');

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded());

app.use('',require('./routes/assignment_routes'));

app.get('/healthz',async (req, res) => {
    try {
        
        if (req.body && Object.keys(req.body).length > 0){
            res.setHeader('Cache-control','no-cache, no-store, must-revalidate');
            res.setHeader('Pragma','no-cache');
            res.setHeader('X-Content-Type-Options','nosniff');
            res.status(400).send();
        }
        else{
            await sequelize.authenticate();
            // const password = "Jay@1998"
            // const email = "jaydoshi171@gmail.com";
            res.setHeader('Cache-control','no-cache, no-store, must-revalidate');
            res.setHeader('Pragma','no-cache');
            res.setHeader('X-Content-Type-Options','nosniff');
            // res.setHeader('Authorization', 'Basic ' + base64.encode(email + ":" + password))
            res.status(200).send();
        }
       
    } catch (error) {
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
