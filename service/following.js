const error = require("../error/customError");
const profileModel = require("../models/profile");

exports.followingService = async (id, userId) => {
  if (id !== userId) {
    const user = await profileModel.findById(id);
    //const currentuser = await profileModel.findById(userId);

    if (!user.followers.includes(userId)) {
      await profileModel.findByIdAndUpdate(id, {
        $push: {
          followers: userId,
        },
      });

      await profileModel.findByIdAndUpdate(userId, {
        $push: {
          followings: id,
        },
      });

      return "follow done";
    } else {
      throw error("you already follow this user ", 201);
    }
  } else {
    throw error("you can,t follow your self", 201);
  }
};

exports.unfollowingService = async (id, userId) => {
  if (id !== userId) {
    const user = await profileModel.findById(id);
    //const currentuser = await profileModel.findById(userId);

    if (user.followers.includes(userId)) {
      await profileModel.findByIdAndUpdate(id, {
        $pull: {
          followers: userId,
        },
      });

      await profileModel.findByIdAndUpdate(userId, {
        $pull: {
          followings: id,
        },
      });

      return "unfollow done";
    } else {
      throw error("you can not  follow this user ", 403);
    }
  } else {
    throw error("you can,t unfollow your self", 403);
  }
};
