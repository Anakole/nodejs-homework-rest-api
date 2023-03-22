const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "",
    { skip, limit }
  ).populate("owner", "_id email");

  res.json({ code: 200, status: "Success", data: result });
};

module.exports = listContacts;
