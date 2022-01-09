const User = require('../models/userModel');

exports.fetchUserById = async (userID) => {
  return await User.findById(userID);
};
exports.fetchUserByEmail = async (email) => {
  return await User.findOne({
    email: email,
  }).select('+password');
};

exports.createUser = async (email, password, name) => {
  return await User.create({ email: email, password: password, name: name });
};
