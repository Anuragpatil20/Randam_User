const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
  gender: String,
  name: {
    title: String,
    first: String,
    last: String,
  },
  email: String,
  phone: String,
  location: {
    city: String,
    country: String,
  },
  picture: {
    large: String,
    medium: String,
    thumbnail: String,
  },
});

 const UserModel = mongoose.model('Users', userSchema);
 module.exports = UserModel