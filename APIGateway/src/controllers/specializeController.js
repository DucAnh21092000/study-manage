const specializeModule = require("../models/specialize.model")

const getAllSpecialize = async (req, res) => {
    const rs = await specializeModule.find({})
    try {
        res.end(
            JSON.stringify(rs)
        );
        res.status(200)
    }
    catch (e) {
        res.status(500).json({ error: e })
    }
}

module.exports = {
    getAllSpecialize
}