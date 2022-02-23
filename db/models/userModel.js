const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    userImage: {
      type: String,
    },
  },
  { timestamps: true }
);
UserModel.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) next(err);
    this.password = hash;
    next();
  });
});
const Users = mongoose.model("User", UserModel);

module.exports = Users;
