const services = require("../services/user.service");

exports.getAndUpdate = async (req, res) => {
    try {
        const users = await services.getAllUsersServices();

        console.log(users)

        users.forEach(async (e) => {
            e.imagePath = e.imagePath.replace("http://localhost:3010", "https://e-commerce-nodejs-dj4i.onrender.com");

            await services.updateUserService(e._id, { imagePath: e.imagePath })
        })

        res.status(200).send({ count: users.length, data: users });
    } catch (err) {
        res.status(400).send(err);
    }
};