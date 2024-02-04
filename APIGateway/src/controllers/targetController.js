
const { ObjectId } = require('mongodb');
const { TargetModel, TargetDetailModel } = require('../models/target.model');

const getTargetList = async (req, res) => {
    try {
        const dataSearch = req.body.dataSearch;
        const rs = await TargetModel.find({}).sort({ createdAt: -1 })
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

const updateTarget = async (req, res) => {
    try {
        const id = req.body.id
        const target = req.body.target
        const result = await TargetModel.findOneAndUpdate({ id }, { target, modifiedDate: new Date() });
        res.status(200).json({ ...result, result: true });

    }
    catch (error) {
        res.status(400).json({ message: error.message, result: false })
    }
}

const getTargetById = async (req, res) => {
    const id = req.params.id
    try {
        const rs = await TargetModel.findOne({ id })
        res.status(200).json(rs)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTodayTarget = async (req, res) => {
    const startDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`
    const endDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`

    try {
        const rs = await TargetDetailModel.find({
            createdAt: {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            }
        })

        res.status(200).json(rs)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createTarget = async (req, res) => {
    const recordId = new ObjectId().toString()
    const target = req.body.target.map(item => {
        return {
            ...item,
            id: new ObjectId().toString(),
            targetId: recordId
        }
    })

    try {
        const finalData = {
            ...req.body,
            id: new ObjectId().toString(),
            target
        }
        if (req.body.id) {
            await TargetDetailModel.findOneAndDelete({ id: req.body.id })
            await TargetModel.findOneAndDelete({ id: req.body.id })
            await TargetModel.create({ ...finalData, id: req.body.id })
            await TargetDetailModel.create({ ...target, id: req.body.id })
        }
        else {
            await TargetModel.create(finalData)
            await TargetDetailModel.create(target)
        }

        res.status(200).json({
            id: recordId,
            isDone: true
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getTargetById, getTargetList, createTarget, updateTarget, getTodayTarget
}
