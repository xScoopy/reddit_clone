const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  password: { type: String, select: false },
  username: { type: String, required: true }
},
  {timestamps: {createdAt: 'created_at'}}
);

module.exports = mongoose.model("User", UserSchema);