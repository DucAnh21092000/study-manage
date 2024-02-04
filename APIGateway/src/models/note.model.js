const mongoose = require("mongoose")

const Schema = mongoose.Schema

const NoteSchema = new Schema({
    name: { type: String, require: true },
    note: { type: String, require: true },
    date: { type: Date, require: true },
    imageId: { type: String, require: false },
    id: { type: String, require: false },
    noteType: { type: Number, require: true }
}, { timestamps: true });

const NoteTypeOption = new Schema({
    label: { type: String, require: false },
    value: { type: Number, require: false }
})
const NoteModule = mongoose.model("notes", NoteSchema);
const NoteTypeModule = mongoose.model("noteTypeOptions", NoteTypeOption);

module.exports = { NoteModule, NoteTypeModule }  

