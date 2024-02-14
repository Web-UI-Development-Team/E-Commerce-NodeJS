const User = require("../models/user.model")

const createNewUserService = async (user) => {
  try {
    return await User.create(user)
  }
  catch (error) {
    console.log(error)
  }
}

const getUserService = async (email) => {
  return await User.findOne({ email })
}

module.exports = {
  createNewUserService,
  getUserService,
}