const router = require('express').Router();
const appConfig = require('../../../../config');
const auth = require('../auth');
const usersDAO = require('./users.dao');
const bcrypt = require('bcrypt');

//Api for users to regitser
router.post('/register', (req, res) => {
    if (req.body.email &&
        req.body.password) {
        const userData = {
            email: req.body.email,
            password: req.body.password
        }
        //Insert data into the db
        usersDAO.createUser(userData, (err, createdUser) => {
            if (err) {
                //Duplicate entry, user already registered
                if (err.code == "11000") {
                    return res.status(400).send("email already exist");
                } else {
                    return res.status(500).send(err);
                }
            } else {
                //User account created succeesfully
                return res.status(200).send({message:"success"});
            }
        });
    } else {
        return res.status(400).send("Invalid request");
    }
});

// Api for users to login and get JWT token
router.post('/login', (req, res) => {
    // Checking if all the required fields are passed
    if (req.body.email &&
        req.body.password) {
        usersDAO.loginUser(req.body.email, (err, user) => {
            if (err)
                return res.status(500).send(err);
            //Invalid user
            if (!user)
                return res.status(401).send('User not found');
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                //Invalid password
                if (err)
                    return res.status(500).send(err);
                if (result === true) {
                    // Generate JWT token with given payloa data which expires in 10 hours
                    auth.signToken(req.body, appConfig.jwtToken.secret, '10h', (err, token) => {
                        // If any error, send user error message to user
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // If no error, send the JWT generated
                        else {
                            return res.status(200).send({token: token});
                        }
                    });
                } else {
                    return res.status(403).send('Wrong password');
                }
            })
        });
    } else {
        return res.status(400).send("Invalid request");
    }
});

module.exports = router;