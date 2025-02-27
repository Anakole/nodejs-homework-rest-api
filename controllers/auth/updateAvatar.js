const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "puplic", "avatar");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);

  await fs.rename(tempUpload, resultUpload);
  Jimp.read(resultUpload, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(resultUpload);
  });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
