const service = require("../services/user.service");
const validator = require("../validation/user.validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
    const { error, value } = validator.validateNewUser(req.body);

    if (error) {
        return res.status(422).send({ message: error.message });
    }

    const { name, email, password, isAdmin } = req.body;

    const user = await service.getUserService(email);

    if (user) {
        return res.send({ message: "this email already exist, please choose another email" })
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await service.createNewUserService({ name, email, encryptedPassword, isAdmin });

    res.send(newUser);
}

const login = async (req, res) => {
    const { error, value } = validator.validateLogin(req.body);

    if (error) {
        return res.status(422).send({ message: error.message });
    }

    try {
        const { email, password } = req.body;

        const user = await service.getUserService(email);

        if (!user) {
            res.status(401).send({ message: "Incorrect email or password" })
        }

        if (!(await bcrypt.compare(password, user.encryptedPassword))) {
            return res.status(401).send({ message: "Incorrect email or password" });
        }

        const token = jwt.sign({ email }, "myjwtsecret", { expiresIn: "1h" });
        res.header({ jwt: token }).send({ token: token, message: "access granted" });

    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = {
    createNewUser,
    login,
}