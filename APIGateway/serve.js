
const express = require("express")
const app = express()
const port = 2109
const http = require("http")
const { getAllPlan, save, getListSchedule, getListScheduleById, deleteSchedule, updateSchedule, getScheduleById, getCurrentSchedule } = require("./src/controllers/PlanController")
const { getAllCurriculum } = require("./src/controllers/curriculumController")
const mongoose = require("mongoose")
var cors = require('cors');
const { getAllSpecialize } = require("./src/controllers/specializeController")
const path = require('path');

const fileRoutes = require('./src/routes/files/file-upload-routes');


require('./database')();
http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json")
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader("Content-Type", "application/json")
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const bodyParser = require('body-parser');
const { uploadImage } = require("./src/controllers/imageController")
const { createNote, getNoteList, getNoteById, getNoteTypeOption, deleteNote } = require("./src/controllers/noteController")
const { createTarget, getTargetById, getTargetList, updateTarget, getTodayTarget } = require("./src/controllers/targetController")
const { getTargetOverview } = require("./src/controllers/overviewController")
const { login } = require("./src/controllers/userController")
const { getListSemester } = require("./src/controllers/semesterController")
app.use(bodyParser.json());

app.set("view engine", "ejs")
app.route("/api/plan/getListSchedule")
    .post(getListSchedule)
app.route("/api/plan/createListSchedule")
    .post(save)
app.route("/api/plan/getScheduleById/:id")
    .get(getListScheduleById)
app.route("/api/plan/getDetailSchedule/:id")
    .get(getScheduleById)
app.route("/api/plan/deleteSchedule/:id")
    .delete(deleteSchedule)
app.route("/api/plan/updateSchedule/")
    .put(updateSchedule)
app.route("/getCurriculum")
    .get(getAllCurriculum)

app.route("/getSpecialize")
    .get(getAllSpecialize)

app.route("/api/note/createNote")
    .post(createNote)

app.route("/api/note/getListNote")
    .post(getNoteList)

app.route("/api/note/getNoteById/:id")
    .get(getNoteById)

app.route("/api/note/deleteNoteById/:id")
    .get(deleteNote)

app.route("/api/note/getNoteTypeOption")
    .get(getNoteTypeOption)

app.route("/api/target/createTarget")
    .post(createTarget)

app.route("/api/target/getListTarget")
    .post(getTargetList)

app.route("/api/target/getTodayTarget")
    .get(getTodayTarget)

app.route("/api/target/getTargetById/:id")
    .get(getTargetById)

app.route("/api/target/updateTarget/")
    .put(updateTarget)

app.route("/api/overview/getTargetOverview")
    .post(getTargetOverview)

app.route("/api/semester/getListSemester")
    .get(getListSemester)

app.route("/api/plan/getCurrentSchedule/:studentId")
    .get(getCurrentSchedule)

app.route("/api/login")
    .post(login)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', fileRoutes.routes);


app.listen(port)
app.use(cors());

