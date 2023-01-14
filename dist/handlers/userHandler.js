"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = exports.createUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createUser(req, res) {
    const unHashedPassword = req.body.password;
    const jwtPayload = {
        username: req.body.username,
    };
    //Hash password
    bcrypt_1.default.hash(unHashedPassword, Number(process.env.SALT_ROUNDS), function (err, hash) {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "unable to create user hash" });
        }
        const hashedPassword = hash;
        // generate token
        jsonwebtoken_1.default.sign(JSON.stringify(jwtPayload), process.env.JWT_PRIVATE_KEY, async (err, token) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "unable to create user" });
            }
            const createDetails = {
                username: req.body.username,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };
            //send details to db
            let result = await user_1.default.create(createDetails);
            console.log(result);
            if (result.error) {
                return res
                    .status(400)
                    .json({ error: "Unable to create this user" });
            }
            return res.status(201).json({
                username: createDetails.username,
                token: token,
                firstName: createDetails.firstName || null,
                lastName: createDetails.lastName || null,
            });
        });
    });
}
exports.createUser = createUser;
async function getUsers(req, res) {
    //console.log(req.headers);
    const allUsers = await user_1.default.index();
    res.json(allUsers);
}
exports.getUsers = getUsers;
async function getUser(req, res) {
    const userId = req.params.userId;
    const result = await user_1.default.read(userId);
    if (result) {
        return res.json(result);
    }
    res.status(404).json({ error: "User not found" });
}
exports.getUser = getUser;
