const express = require("express");
const {
  following,
  Getprofile,
  registerUser,
  updateProfile,
  passchangeController,
  unfollow,
  loginuser,

} = require("../controller/profilecontroller");
const { post, getallpost, likeDislike,deletePost } = require("../controller/postcontroller");
const { checkValiduser } = require("../middleware/authcheck");

const router = express.Router();
router.get("/post", getallpost )
router.post("/post",checkValiduser, post);
router.get("/", Getprofile);
router.post("/", registerUser);
router.post("/login", loginuser);
router.put("/:id", updateProfile);
router.put("/changepass/:id", passchangeController);
router.put("/following/:id", following);
router.put("/unfollow/:id", unfollow);
router.put("/like/:id", checkValiduser, likeDislike);
router.delete("/post/:id", checkValiduser, deletePost);
module.exports = router;
