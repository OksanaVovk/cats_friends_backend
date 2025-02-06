const { Schema, model } = require('mongoose');

const volonteerSchema = Schema(
  {
    img: { type: String, require: true },
    name: { type: String, require: true },
    text: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

const Volonteer = model('volonteer', volonteerSchema);

module.exports = Volonteer;
