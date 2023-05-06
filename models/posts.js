const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema(
  {
    title : {
      type: String,
      required: true,
    },
    image: [{ type: String, required: false }],
    author: {
      ref: "profile",
      type: Types.ObjectId,
    },
    likes : []
  },
  {
    timestamps: true,
  }
);

const postModel = model("post", postSchema);

module.exports = postModel;
