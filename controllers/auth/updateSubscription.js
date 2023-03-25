const { User } = require("../../models");
const HttpError = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id, subscription } = req.params;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "Success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscription;
