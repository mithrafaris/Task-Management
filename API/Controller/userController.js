const User = require('../models/usermodel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/error');
const Task = require('../models/taskModel');

// User Signup
exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error while saving new user:', error);
    next(errorHandler(500, 'An error occurred while creating the user'));
  }
};

// User Signin
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Delete User Function
exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.user || req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can only delete your own account!'));
    }
    await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'User has been deleted!' });
  } catch (error) {
    next(error);
  }
};

exports.signOut =async(req,res,next)=>{
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been signed out');
  } catch (error) {
    next(error);
  }
}




