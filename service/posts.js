const error = require("../error/customError");
const postModel = require("../models/posts");
const profileModel = require("../models/profile");

const postService = async (title, image, authorId) => {
  const post = new postModel({
    title: title,
    image: image,
    author: authorId,
  });

  const res = await post.save();
  await profileModel.findByIdAndUpdate(authorId, {
    $push: {
      posts: res._id,
    },
  });

  return "success";
};

const getAllposts = (key, value) => {
  if (key === "_id") {
    return profileModel.findById(value).populate("posts");
  }
  if (!key || !value) {
    return postModel.find().populate("author", { name: 1, _id: 1 });
  }

  return postModel.find({ [key]: value }).populate("author");
};

const likepostservice = async (postId, userId) => {
  const post = await postModel.findById(postId);
  if (post.likes.includes(userId)) {
    await post.updateOne({ $pull: { likes: userId } });
    return {
      liked: false,
      message: "dislike",
    };
  } else {
    await post.updateOne({ $push: { likes: userId } });
    return {
      liked: true,
      message: "liked",
    };
  }
};

const deletePostService = async (postid, userId) => {
  const posts = await postModel.findById(postid);
  if (!posts) throw error("id is not found", 403);
  const id = posts.author._id.toString()
  if (id === userId) {
    await profileModel.findByIdAndUpdate(userId, {
      $pull: {
        posts: posts._id,
      },
    });

   return await postModel.findByIdAndDelete(postid);
   
  } else {
    throw error("you can delete your post only ", 403);
  }
};
module.exports = {
  postService,
  getAllposts,
  likepostservice,
  deletePostService,
};
