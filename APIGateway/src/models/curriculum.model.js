const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CurriculumSchema = new Schema({
    label: { type: String, require: true },
    value: { type: Number, require: true }
});

const CurriculumModule = mongoose.model("curriculum", CurriculumSchema);
module.exports = CurriculumModule 