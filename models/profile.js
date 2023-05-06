const { Schema, model, Types } = require("mongoose");

const profileSchema = new Schema(
  {
    userTitle: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      max: 100,
      min: 2,
    },
    email: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    coverPhoto: {
      type: String,
      required: false,
    },
    date_of_birth: {
      type: String,
      required: true,
      default: new Date(),
    },
    gender: {
      type: String,
      required: false,
      enum: ["male", "female", "others"],
      default: "male",
    },
    password: {
      type: String,
      required: true,
    },
    followers: [{ref: "profile", type: Types.ObjectId}],
    followings: [{ref: "profile", type: Types.ObjectId}],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    posts: [{ ref: "post", type: Types.ObjectId }],
    relationship: {
      type: String,
      required: false,
      default: "single",
    },
    bio: {
      type: String,
      required: false,
    },
    lives: {
      type: String,
      required: false,
    },
    joined: {
      type: String,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const profileModel = model("profile", profileSchema);
module.exports = profileModel;
