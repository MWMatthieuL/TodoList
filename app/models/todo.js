const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    state: {
      type: Boolean,
    }
  },
  {
    collection: "todo",
    minimize: false,
    versionKey: false,
    autoIndex: true
  }).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = Schema;
