const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  userName: String,
  password: String,
});

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return password === this.password;
};

module.exports = model('User', userSchema);
