const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  thought: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
});


const User = model("user", userSchema);

module.exports = User;