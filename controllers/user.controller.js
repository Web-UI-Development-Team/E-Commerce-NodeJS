const { date } = require("joi");
const service = require("../services/user.service");
const validator = require("../validation/user.validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
  const { error, value } = validator.validateNewUser(req.body);

  if (error) {
    return res.status(422).send({ message: error.message });
  }

  const { email, password } = req.body;

  const user = await service.getUserService(email);

  if (user) {
    return res.send({
      message: "this email already exist, please choose another email",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  delete req.body.password;
  req.body.encryptedPassword = encryptedPassword;


  const newUser = await service.createNewUserService(req.body);

  res.send(newUser);
};

const getAllUsers = async (req, res) => {
  const data = await service.getAllUsersServices();
  console.log(data);

  if (!data) {
    res.status(401).send({ message: "There is no products" });
    return;
  }

  res.status(200).send(data);
};

const getUserById = async (req, res) => {
  const user = await service.getUserByIdService(req.params.id);
  console.log(user);
  if (!user) {
    res.status(401).send({ message: "there is no user to show" });
    return;
  }
  res.status(200).send(user);
};

const updateUser = async (req, res) => {
  const user = await service.getUserByIdService(req.params.id);
  if (!user) {
    return res
      .status(404)
      .send("The user with id:" + req.params.id + "not exist");
  }

  const { error, value } = validator.updateUserValidation(req.body);

  if (error) {
    return res.status(400).send({ message: "Please enter valid data" });
  }

  await service.updateUserService(req.params.id, req.body);
  res.send(await service.getUserByIdService(req.params.id));
};

const deleteUser = async (req, res) => {
  const user = await service.deleteUserService(req.params.id);
  if (!product) {
    res
      .status(404)
      .send("The product with id: " + req.params.id + " not exists");
    return;
  }

  await service.deleteUserService(req.params.id);
  res.send(user);
};

const userSearch = async (req, res) => {
  try {
    const user = await service.userSearchServices(req.params.search);
    if (!user || user.length === 0) {
      res.status(404).send("The User doesn't exist");
      return;
    }
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { error, value } = validator.validateLogin(req.body);

  if (error) {
    return res.status(422).send({ message: error.message });
  }

  try {
    const { email, password } = req.body;

    const user = await service.getUserService(email);

    if (!user) {
      res.status(401).send({ message: "Incorrect email or password" });
    }

    if (!(await bcrypt.compare(password, user.encryptedPassword))) {
      return res.status(401).send({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ email }, "myjwtsecret", { expiresIn: "1h" });
    res
      .header({ jwt: token })
      .send({ token: token, message: "access granted" });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  userSearch,
  login,
};
