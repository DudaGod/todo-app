'use strict';

const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({extended: false}))
    .use('/api/v1/', apiRoutes(express.Router()));

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
