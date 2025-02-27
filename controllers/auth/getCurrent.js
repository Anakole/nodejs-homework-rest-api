const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    code: 200,
    status: "Success",
    data: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
