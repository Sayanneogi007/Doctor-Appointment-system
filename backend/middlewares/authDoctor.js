import jwt from "jsonwebtoken";

//Doctor authentication middlewares
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken, dToken } = req.headers;
    const token = dtoken || dToken;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decoder = jwt.verify(token, process.env.JWT_SECRET);

    req.docId = token_decoder.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
