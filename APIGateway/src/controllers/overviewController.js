const { TargetModel } = require('../models/target.model');

const getTargetOverview = async (req, res) => {
    const type = req.body.type
    try {
        const rs = await TargetModel.find({})
        const temp = rs.reduce((acc, curr) => {

            return [...acc, ...curr.target]
        }, [])

        const result = type?.length !== 0 && type ? temp.filter(item => item.isDone == type[0]) : temp;

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

module.exports = {
    getTargetOverview
}