const { Schema, model } = require('mongoose');

const catSchema = Schema(
  {
    img: { type: String, require: true },
    title: { type: String, require: true },
    gender: { type: String, require: true },
    age: { type: Number, default: null },
    weight: { type: Number, default: null },
    text: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

const Cat = model('cat', catSchema);

module.exports = Cat;
