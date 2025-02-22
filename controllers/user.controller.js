const { validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const auth = require('../auth/user.auth')


exports.signup = async (req, res) => {
    try {
        //check for errors from validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors });
        }

        let { username, password, email } = req.body;
        username = username.trim().toLowerCase();
        email = email.trim().toLowerCase();

        //check if username exists
        const usernameExist = await userModel.userExists(username);
        if (usernameExist) {
            return res.status(401).json({
                status: "failed",
                message: "Username already exists"
            });
        }
        //check if email exists
        // const emailExists = await userModel.emailExists(email);
        // if (emailExists) {
        //     return res.status(401).json({
        //         status: "failed",
        //         message: "Email already exists"
        //     });
        // }
        const result = await createUser(username, password, email);
        res.status(201).json({
            status: "success",
            message: "User successfully created",
            userId: result.id
        })


    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Server error"
        });
    }
}

exports.login = async (req, res) => {
    try {
        //check for errors from validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors });
        }

        let { username, password } = req.body;
        username = username.trim().toLowerCase();
        //check if username exists
        const user = await userModel.loginUser(username, password);
        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid username or password",
            });
        }

        const accessToken = auth.generateAccessToken(user);
        res.status(200).json({
            status: "success",
            message: "User successfully logged in",
            userDetail: {
                token: accessToken,
                username: user.name,
                userId: user.id,
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Database error"
        });
    }

}
exports.getUser = (req, res) => {
    res.json({ user: req.user })
}