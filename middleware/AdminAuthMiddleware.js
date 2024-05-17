const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const header = req.header["authorization"];
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization denied",
      });
    }
    const token = header.split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log("unable to verify token");
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        // Check if the user is an admin based on userType in the decoded token
        if (decode.userType !== "admin") {
          return res.status(403).json({
            message: "Forbidden: You do not have permission to perform this action",
          });
        }
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Invalid token",
      success: false,
    });
  }
};
