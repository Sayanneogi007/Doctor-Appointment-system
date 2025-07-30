import jwt from "jsonwebtoken";

// admin authentication middlewares
const authAdmin = async (req, res, next) => {
  try {
    const { atoken, aToken } = req.headers;
    const token = atoken || aToken;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decoder = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decoder.email !== process.env.ADMIN_EMAIL ||
      token_decoder.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
