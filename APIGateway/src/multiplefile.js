const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema({
    files: [Object],
    recordId: { type: String, require: true }
}, { timestamps: true });

module.exports = mongoose.model('MultipleFile', mulitipleFileSchema);