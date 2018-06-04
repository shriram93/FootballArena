const User = require('./users.entity');

//Creating user in database
const createUser = (userData, done) => {
    User.create(userData, (err, createdUser) => {
        if (err) {
            return done(err);
        } else {
            return done(null, createdUser);
        }
    });
};

//Querying database for the user email address
const loginUser = (userEmail, done) => {
    User.findOne({ email: userEmail},(err,userDetails) => {
        console.log(userDetails);
        if (err) {
            return done(err);
        } else {
            return done(null, userDetails);
        }
    });
};

module.exports = {
    createUser,
    loginUser
};