const SemesterModel = require("../models/semester.model")

const getListSemester = async (req, res) => {
    try {
        const listSemester = await SemesterModel.find({})
        res.status(200).json(listSemester)
    }
    catch (e) {
        console.log(e)
        res.status(400).json({ message: e })
    }
}

module.exports = { getListSemester }