const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
  {
    name: { type: String, require: true, minlength: 2 },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, minlength: 6 },
    favorite: { type: Array, require: true, default: [] },
    token: { type: String, require: true },
    avatarUrl: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  token: Joi.string(),
});

const favoriteSchema = Joi.object({
  catsId: Joi.string().required(),
});

module.exports = { User, loginSchema, registerSchema, favoriteSchema };
