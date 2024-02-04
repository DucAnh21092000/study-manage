const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterModel = new Schema({
    value: { type: Number },
    label: { type: String }
}, { timestamps: true });



const SemesterModel = mongoose.model('listSemester', semesterModel);
module.exports = SemesterModel;