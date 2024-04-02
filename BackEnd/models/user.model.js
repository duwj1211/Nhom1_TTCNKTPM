const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const UserSchema = mongoose.Schema({
  email: { type: String, require: false },
  password: { type: String, require: true },
  firstName: { type: String, require: false },
  lastName: { type: String, require: false },
  phoneNumber: { type: String, require: false },
  status: { type: Number, require: false }
}, { timestamps: true })

UserSchema.pre('save', async function(next) {
  try {
    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(this.password, salt);
    this.password = passwordHashed;
  } catch(error) {
    next(error)
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User