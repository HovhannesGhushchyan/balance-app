const express = require('express');
const bodyParser = require('body-parser');
const { umzug }  = require('./utils/migrate');
const { updateUserBalance, createUserBalance } = require('./controllers/userController');
const validateUpdateBalance = require('./middlewares/validateUpdateBalance');

const app = express();

app.use(bodyParser.json());

app.put('/update-balance', validateUpdateBalance, updateUserBalance);


umzug.up().then(() => {
    console.log('Migrations executed successfully');
}).catch((err) => {
    console.error('Migrations failed:', err);
});

module.exports = app;