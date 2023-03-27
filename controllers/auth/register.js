const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email alredy in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = v4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}"> Click verify email </a>`,
  };

  await sendEmail(verifyEmail);

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
