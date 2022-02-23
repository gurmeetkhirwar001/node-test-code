const Joi = require("joi");
const UserModel = require("../db/models/userModel");
const bcrypt = require("bcrypt");
const {
  Registerschema,
  ResetPasswordchema,
} = require("../validators/userValidation");
const responseHandler = require("../helpers/response");
const { createNewToken, decryptToken } = require("../helpers/jwt");
const { sendmail } = require("../helpers/nodemailer");

const registerNewUser = async (req, res, next) => {
  try {
    await Registerschema.validateAsync(req.body);

    const User = new UserModel(req.body);
    const userDetail = await User.save();
    const token = createNewToken(userDetail);
    responseHandler.success(
      res,
      { message: "User Created Successfully", token },
      200
    );
  } catch (e) {
    next(e);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    await ResetPasswordchema.validateAsync(req.body);

    const User = await UserModel.findOne({ email: req.body.email });
    if (User) {
      console.log(req.body);
      const verificationtoken = createNewToken(User);
      const resetLink = `http://localhost:4000/api/user/updatePassword?token=${verificationtoken}`;
      const resp = await sendmail(
        req.body.email,
        "Reset Password Mail",
        `You Have requested to reset password please click on link below ${resetLink}`
      );
      responseHandler.success(res, "Reset Password mail sent", 200);
    } else {
      throw Error("User Not Found!!!");
    }
  } catch (e) {
    next(e);
  }
};
const updatePassword = async (req, res, next) => {
  try {
    const decryptedToken = await decryptToken(req.query.token);
    const User = await UserModel.findOne({ email: decryptedToken.userEmail });

    if (User) {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      await UserModel.updateOne(
        { _id: decryptedToken.id },
        { password: encryptedPassword }
      );
      const resp = await sendmail(
        req.body.email,
        "Update Password Mail",
        `Your Password is updated`
      );
      responseHandler.success(res, "Password is Updated", 200);
    } else {
      throw Error("User Not Found!!!");
    }
  } catch (e) {
    next(e);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    console.log(req.file.path);
    const resp = await UserModel.updateOne(
      { _id: req.params.id },
      { userImage: req.file.path }
    );
    responseHandler.success(res, "Image Uploaded SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerNewUser,
  resetPassword,
  updatePassword,
  uploadImage,
};
