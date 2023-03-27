const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne(verificationCode);
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    code: 200,
    status: "Success",
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
