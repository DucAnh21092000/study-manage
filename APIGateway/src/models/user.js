const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    id: { type: String, require: false },
    username: { type: String, require: false },
    password: { type: String, require: false },
    profileName: { type: String, require: false },
    studentId: { type: Number, require: false }
}, { timestamps: true });



const UsersModel = mongoose.model('users', userModel);
module.exports = UsersModel;