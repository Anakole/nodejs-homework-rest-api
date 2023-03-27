const bcrypt = require("bcrypt");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email alredy in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    code: 201,
    status: "Created",
    data: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
