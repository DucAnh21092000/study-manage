const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const specializeSchema = new Schema({
    label: {
        type: String, require: true
    },
    value: {
        type: Number, require: true
    }   
})

const specializeModule = mongoose.model("specializes", specializeSchema)
module.exports = specializeModule