const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // console.log("===================");
  // console.log(req.headers);
  // console.log(req.headers["authorization"]);
  // console.log("===================");
  try {
    const header = req.headers["authorization"];
    if (!header || !header.startsWith("Bearer ")) {
      console.log("Inside try ################");
      return res.status(401).json({
        message: "Authorization denied",
      });
    }
    const token = header.split(" ")[1];
    
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        
        next();
      }
    });
  } catch (error) {
    console.log("============ catch ", error);
    res.status(401).send({
      message: "Invalid token",
      success: false,
    });
  }
};
