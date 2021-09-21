const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("./../util/error");
const db = require("../Users");

const User = db.users


exports.auth = (req, res, next) =>{
  try {
    const { username, password } = req.body;
    if ( username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD ) {
      const token = jwt.sign({
          id: null,
          title: username,
          role: "admin",
        },
        process.env.TOKEN_SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: process.env.TOKEN_ADMIN_EXPIRESIN,
        }
      );

      return res.status(200).json({ token });
    }
    throw new Error();
  } catch (err) {
    return next(new ErrorHandler(401, "Authentication failed"));
  }
    
}
