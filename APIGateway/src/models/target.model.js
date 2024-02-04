const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const targetModule = new Schema({
    note: { type: String, required: true },
    name: { type: String, required: true },
    target: { type: Object, required: true },
     startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    id: { type: String, require: false }
}, { timestamps: true });

const targetDetail = new Schema({
    id: { type: String, required: false },
    todo: { type: String, required: false },
    isDone: { type: Boolean, required: false },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    completeDate: { type: Date, require: false },
    targetId: { type: String, required: false },
}, { timestamps: true });


const TargetModel = mongoose.model('targets', targetModule);
const TargetDetailModel = mongoose.model('listTargets', targetDetail);
module.exports = {
    TargetModel, TargetDetailModel
};