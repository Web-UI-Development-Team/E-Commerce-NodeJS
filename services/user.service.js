const User = require("../models/user.model");

const createNewUserService = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsersServices = async () => {
  try {
    return await User.find();
  } catch (e) {
    console.log(e);
  }
};

const getUserByIdService = async (id) => {
  try {
    return await User.findOne({ _id: id });
  } catch (e) {
    console.log(e);
  }
};

const updateUserService = async (id, body) => {
  try {
    return await User.updateOne({ _id: id }, body);
  } catch (e) {
    console.log(e);
  }
};

const deleteUserService = async (id) => {
  try {
    return await User.deleteOne({ _id: id });
  } catch (e) {
    console.log(e);
  }
};

const getUserService = async (email) => {
  return await User.findOne({ email });
};

const userSearchServices = async (search) => {
  try {
    return await User.find({ name: { $regex: search, $options: "i" } });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createNewUserService,
  getUserService,
  getAllUsersServices,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  userSearchServices,
};
