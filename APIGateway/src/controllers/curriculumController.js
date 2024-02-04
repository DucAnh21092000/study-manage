const CurriculumModule = require("../models/curriculum.model")

const getAllCurriculum = async (req, res) => {
    try {
        const rs = await CurriculumModule.find({})

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

module.exports = {
    getAllCurriculum
}
