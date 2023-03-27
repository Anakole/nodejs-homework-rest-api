const bcrypt = require("bcrypt");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passwordCompare = await bcrypt.compare(
    password,
    user.password
  );

  if (!user || !passwordCompare) {
    throw HttpError(401, "Email or password inwalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    code: 200,
    status: "Success",
    data: {
      user,
      token,
    },
  });
};

module.exports = login;
