'use strict';

const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({extended: false}))
    .use('/api/v1/', apiRoutes(express.Router()));

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});
