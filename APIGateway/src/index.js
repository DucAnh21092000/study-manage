
const express = require("express")
const app = express()
const port = 2109
const http = require("http")
const { getAllPlan, save } = require("./src/controllers/PlanController")
const { getAllCurriculum } = require("./src/controllers/curriculumController")
const mongoose = require("mongoose")
var cors = require('cors');
const { getAllSpecialize } = require("./src/controllers/specializeController")


mongoose.createConnection("mongodb://localhost:27017/studyManage")
mongoose.connect("mongodb://localhost:27017/studyManage", {
    serverSelectionTimeoutMS: 50000,
});

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
app.route("/hi")
    .get(getAllPlan)
app.route("/getCurriculum")
    .get(getAllCurriculum)

app.route("/getSpecialize")
    .get(getAllSpecialize)

app.listen(port)
app.use(cors());

