const {
  postService,
  getAllposts,
  likepostservice,
  deletePostService,
} = require("../service/posts");

const post = async (req, res, next) => {
  const { _id: id } = req.users;
  const { title, image } = req.body;
  try {
    const result = await postService(title, image, id);
    res.status(200).json({
      result,
      message: "post successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getallpost = async (req, res, next) => {
  try {
    const result = await getAllposts();
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const likeDislike = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.users._id;

  try {
    const response = await likepostservice(postId, userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  const postid = req.params.id;
  const userId = req.users._id;
  try {
    await deletePostService(postid, userId);
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = { post, getallpost, likeDislike, deletePost };
