const CurriculumModule = require("../models/curriculum.model");
const { NoteModule, NoteTypeModule } = require("../models/note.model");
const { ObjectId } = require('mongodb')

const getNoteList = async (req, res) => {
    try {
        const dataSearch = req.body.dataSearch;
        const rs = await NoteModule.find({}).sort({ createdAt: -1 })
        let result = rs;
        if (dataSearch) {
            result = rs.filter(item => item.name.toLowerCase().includes(dataSearch.toLowerCase()))
        }
        res.setHeader("Content-Type", "application/json")
        res.end(
            JSON.stringify(result)
        );
        res.status(200)

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNoteTypeOption = async (req, res) => {
    try {
        const rs = await NoteTypeModule.find({})

        res.setHeader("Content-Type", "application/json")
        res.end(
            JSON.stringify(rs)
        );
        res.status(200)

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNoteById = async (req, res) => {
    const id = req.params.id
    try {
        const rs = await NoteModule.findOne({ id })
        res.status(200).send(rs)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createNote = async (req, res) => {

    try {
        const finalData = {
            ...req.body,
            id: new ObjectId().toString()
        }
        const rs = await NoteModule.create(finalData)
        res.status(200).send(rs)

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id
        const result = await NoteModule.deleteOne({ id: noteId });
        res.status(200).json({ ...result, result: true });

    }
    catch (error) {
        res.status(400).json({ message: error.message, result: false })
    }
}

module.exports = {
    getNoteList,
    createNote,
    getNoteById,
    getNoteTypeOption,
    deleteNote
}
