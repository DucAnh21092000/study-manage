const UsersModel = require("../models/user");

const login = async function (req, res) {

    try {

        const user = await UsersModel.findOne({ username: req.body.username });
        if (user) {
            const finalResult = {
                profileName: user.profileName,
                studentId: user.studentId,
                login: true
            }

            const result = req.body.password === user.password;
            if (result) {
                res.status(200).json(finalResult);
            } else {
                res.status(200).json({
                    login: false,
                    message: "Password doesn't match!"
                });
            }
        } else {
            res.status(200).json({
                login: false,
                message: "Password doesn't match!"
            });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = { login }