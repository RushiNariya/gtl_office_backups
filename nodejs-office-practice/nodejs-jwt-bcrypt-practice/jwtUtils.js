const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const userInfo = {
    id: payload.id,
    email: payload.email,
    password: payload.password,
  };
  console.log(userInfo);
  const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  return token;
};

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  const token = bearerHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
  
    if (decoded.email == "rushipatel@gmail.com") {
        next();
      } else {
        throw new Error("user not exists!");
      }
  } catch (error) {
        res.status(404).json({
            status:404,
            error: {
              error,
            },
            data: null,
          });
  }
  
  
};

module.exports = { generateToken, ensureToken };
