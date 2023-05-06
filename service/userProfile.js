const error = require("../error/customError");
const profileModel = require("../models/profile");
const bcrypt = require("bcrypt");
const slugify = require("slugify");
const jwt = require("jsonwebtoken");
const findUserService = (key, value) => {
  if (key === "_id") {
    return profileModel.findById(value);
  } else if (!key || !value) {
    return profileModel
      .find()
      .populate("followers", { name: 1, _id: 1 })
      .populate("followings", { name: 1, _id: 1 });
  }

  return profileModel.findOne({ [key]: value });
};

const saveUserService = async ({
  name,
  email,
  password,
  profilePicture,
  coverPhoto,
  date_of_birth,
  gender,
}) => {
  const isExist = await findUserService("email", email);
  if (isExist) throw error("this email is already exist", 201);
  const usertitle = slugify(name);
  const user = new profileModel({
    userTitle: usertitle,
    name,
    email,
    password,
    profilePicture,
    coverPhoto,
    date_of_birth,
    gender,
  });
  return user.save();
};

const loginService = async (email, password) => {
  const user = await findUserService("email", email);
  if (!user) throw error("user not found ", 403);
  const pass_check = await bcrypt.compareSync(password, user.password);
  if (!pass_check) throw error("invalid password", 403);
  const payload = {
    _id: user._id,
    userTitle: user.userTitle,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, "secrect", {
    expiresIn: "1days",
  });

  return token;
};

const update = async (id, data) => {
  const checkThisEmail = await findUserService("email", data.email);
  if (checkThisEmail) throw error("This email is already exist", 201);
  return profileModel.findOneAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true }
  );
};

const changePass = async (id, allpass) => {
  const { password } = await findUserService("_id", id);
  const matchpass = await bcrypt.compareSync(allpass.oldpass, password);
  if (matchpass) {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(allpass.newpass, salt);
    return profileModel.findOneAndUpdate(
      id,
      { $set: { password: hash } },
      { new: true }
    );
  } else {
    throw error("old password not match");
  }
};
module.exports = {
  findUserService,
  saveUserService,
  update,
  changePass,
  loginService,
};
