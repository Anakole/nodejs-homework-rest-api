const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.json({
    code: 200,
    status: "Success",
    message: "Logout sucsess",
  });
};

module.exports = logout;
