'use strict';
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/studyManage', {

    }).then(() => console.log('Connected to Mongodb......'));
}