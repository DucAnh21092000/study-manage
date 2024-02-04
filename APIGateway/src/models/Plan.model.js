const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyManage = new Schema({
    subject: { type: String, required: true },
    note: { type: String, required: false },
    createDate: { type: Date, required: false },
    classNo: { type: Number, required: true },
    subclassno: { type: Number, required: false },
    name: { type: String, required: false },
    registered: { type: Number, required: true },
    maxRegistered: { type: Number, required: true },
    classType: { type: String, required: true },
    time: { type: String, required: true },
    day: { type: Number, required: true },
    recordId: { type: String, required: false },
    scheduleId: { type: String, required: false },
    subjectId: { type: String, required: true },
    totalCollageCredit: { type: Number, require: true },
}, { timestamps: true });

const currentTimeLine = new Schema({
    ...studyManage.obj,
    studyType: { type: String },
    studentId: { type: String }
}, { timestamps: true })

const listSchedule = new Schema({
    name: { type: String, required: true },
    note: { type: String, required: false },
    scheduleId: { type: String, required: false },
    createdDate: { type: Date, required: false },
    status: { type: Number, required: false },
    modifiedDate: { type: Date, required: false },
    semester: { type: Number, require: true },
}, { timestamps: true });

const listTable = new Schema({
    name: { type: String, required: true },
    recordId: { type: String, required: false },
    scheduleId: { type: String, required: false },
}, { timestamps: true });

const CurrentSchedule = mongoose.model('currentSchedule', currentTimeLine)
const PlanModule = mongoose.model('studyplans', studyManage);
const ListTable = mongoose.model('listTable', listTable);
const ListScheduleModule = mongoose.model('listPlans', listSchedule);
module.exports = { PlanModule, ListScheduleModule, ListTable, CurrentSchedule };