const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ code: 200, status: "Success", data: result });
};

module.exports = updateContact;
