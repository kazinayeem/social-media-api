const jwt = require("jsonwebtoken");
const error = require("../error/customError");
exports.checkValiduser = (req, res, next) => {
  const gettoken = req.headers.authorization;
  if (!gettoken) throw error("unauthorized user");
  const token = gettoken.split(" ")[1];
  try {
    jwt.verify(token, "secrect", (err, decoded) => {
      if (err) {
        throw error("token expaired", 403);
      } else {
        req.users = decoded;
        next();
      }
    });
  } catch (err) {
    throw error("token expaired or invalid", 403);
  }
};
