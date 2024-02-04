const { PlanModule, ListScheduleModule, ListTable, CurrentSchedule } = require("../models/Plan.model")
const { ObjectId } = require('mongodb')
const getAllPlan = async (req, res) => {
    try {

        const products = await PlanModule.find({});
        res.status(200).json(products);

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getListSchedule = async (req, res) => {
    try {
        const status = req.body.status
        const semester = req.body.semester
        const dataSearch = req.body.dataSearch
        let result;
        if (dataSearch) {
            const temp = await ListScheduleModule.find({ status }).sort({ createdAt: -1 })
            result = temp.filter(item => item.name.includes(dataSearch))

        }
        else if (semester && semester !== 1) {
            result = await ListScheduleModule.find({ status, semester: semester }).sort({ createdAt: -1 })
        }
        else if (semester) {
            result = await ListScheduleModule.find({ status }).sort({ createdAt: -1 })
        }
        else if (dataSearch && semester) {
            result = await ListScheduleModule.find({ status, semester: semester, name: dataSearch }).sort({ createdAt: -1 })
        }
        res.status(200).json(result);

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getListScheduleById = async (req, res) => {
    const scheduleId = req.params.id
    try {
        const result = await PlanModule.find({
            scheduleId
        })
        const scheduleDetail = await ListScheduleModule.findOne({ scheduleId })
        const listTable = await ListTable.find({ scheduleId })
        const groupedArray = result.reduce((acc, obj) => {
            const key = obj.recordId;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return { ...acc };
        }, {});
        const finalResult = Object.values(groupedArray).map((arr, index, array) => {
            const currentTable = listTable.find(item => item.recordId === arr[0].recordId)

            return {
                id: currentTable.recordId,
                name: currentTable.name,
                dataModel: arr,
                totalCollageCredit: array[index][0].totalCollageCredit,

            }
        })
        const finalResponse = {
            name: scheduleDetail.name,
            result: finalResult,
            note: scheduleDetail.note || null,

        };

        res.status(200).json(finalResponse)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
}

const getScheduleById = async (req, res) => {
    try {
        const recordId = req.params.id
        const products = await PlanModule.find({ recordId });
        res.status(200).json(products);

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getCurrentSchedule = async (req, res) => {
    try {
        const studentId = req.params.userId
        const products = await CurrentSchedule.find({ studentId });
        res.status(200).json(products);

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const save = async (req, res) => {
    try {
        const temp = req.body.result;
        const name = req.body.name
        const status = req.body.status
        const semester = req.body.semester
        const note = req.body.note
        const scheduleId = new ObjectId().toString()
        const result = temp?.map(item => {
            const recordId = new ObjectId().toString()
            return {
                name: item.tableName,
                recordId,
                scheduleId,
                data: item.data.map(record => {
                    return {
                        ...record,
                        recordId,
                        scheduleId,
                    }
                }),

            }
        })
        let finalData = [];
        result.forEach(element => {
            element.data.forEach(item => finalData.push(item))
        });
        const scheduleResult = await PlanModule.insertMany(finalData);
        const listTable = await ListTable.insertMany(result)
        const listsCheduleResult = await ListScheduleModule.insertMany([{ name, scheduleId, createdDate: new Date(), status, semester, note }]);
        res.status(200).json({ message: "Create Schedule success", result: true });

    }
    catch (error) {
        res.status(400).json({ message: error.message, result: false })
    }
}

const deleteSchedule = async (req, res) => {
    try {
        const scheduleId = req.params.id
        const result = await ListScheduleModule.deleteOne({ scheduleId });
        res.status(200).json({ ...result, result: true });

    }
    catch (error) {
        res.status(400).json({ message: error.message, result: false })
    }
}


const updateSchedule = async (req, res) => {
    try {
        const scheduleId = req.body.scheduleId
        const status = req.body.status
        const result = await ListScheduleModule.findOneAndUpdate({ scheduleId }, { status, modifiedDate: new Date() });
        res.status(200).json({ ...result, result: true });

    }
    catch (error) {
        res.status(400).json({ message: error.message, result: false })
    }
}

module.exports = {
    getAllPlan, save, getListSchedule, getListScheduleById, deleteSchedule, updateSchedule, getScheduleById, getCurrentSchedule
}