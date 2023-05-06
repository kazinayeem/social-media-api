const {
  findUserService,
  saveUserService,
  update,
  changePass,
  loginService
} = require("../service/userProfile");
const error = require("../error/customError");
const bcrypt = require("bcrypt");
const {
  followingService,
  unfollowingService,
} = require("../service/following");

const loginuser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await loginService(email, password);
    res.status(200).json({
      token : `Bearer ${result}`,
    });
  } catch (error) {
    next(error);
  }
};
const Getprofile = async (req, res, next) => {
  try {
    const result = await findUserService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  if (!req.body) {
    throw error("provide valid user");
  }
  const {
    name,
    email,
    password,
    profilePicture,
    coverPhoto,
    date_of_birth,
    gender,
  } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    const saveuser = await saveUserService({
      name,
      email,
      password: hash,
      profilePicture,
      coverPhoto,
      date_of_birth,
      gender,
    });

    res.status(200).json(saveuser);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  //   if (!req.params.id) throw error("id not found ", 201);
  try {
    const result = await update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const passchangeController = async (req, res, next) => {
  //if (!req.params.id) throw error(" id not found ", 201);
  const id = req.params.id;
  try {
    await changePass(id, req.body);
    res.status(200).json({
      message: "pass change",
    });
  } catch (error) {
    next(error);
  }
};

const following = async (req, res, next) => {
  try {
    const result = await followingService(req.params.id, req.body.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const unfollow = async (req, res, next) => {
  try {
    const result = await unfollowingService(req.params.id, req.body.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  Getprofile,
  registerUser,
  updateProfile,
  passchangeController,
  following,
  unfollow,
  loginuser,
};
