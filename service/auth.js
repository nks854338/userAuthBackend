const jwt = require("jsonwebtoken");
const secret= "Nandani@123";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}


function getUser(token) {
    try {
      const decoded = jwt.verify(token, secret); // Verify and decode the token
      return decoded.user; // Assuming your token has a `user` object
    } catch (error) {
      return null; // Invalid token
    }
  }

module.exports = {
    setUser, 
    getUser,
}
