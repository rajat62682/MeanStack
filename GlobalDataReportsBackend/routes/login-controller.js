var express = require('express');
var router = express.Router();
var mongodb = require('mongoose');
var url = require('../constants').dburl;
var userModel = require('../models/user');
var username = "";
router.post('/login', function (req, res, next) {
    console.log(req.body);
    res.setHeader("Content-type", "application/json");
    mongodb.connect(url, { useNewUrlParser: true }).then((value) => {
        console.log("Case of Error" + value);
        userModel.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
            if (err) {
                console.log(err);

                res.status(500).json({ success: false, message: err.errmsg, data: {} });
            }
            else {
                console.log(user);
                if (user) {
                    req.session.username = user.username;
                    res.status(200).json({ success: true, message: "Authenticated successfully" });

                }
                else {
                    res.status(401).json({ success: false, message: "Unauthorized" })
                }
            }
        }).then(() => {
            db.close();
        });
    }).catch((error) => {
        res.status(500).json({ success: false, message: error.message, data: {} });
    });
});

router.get('/logout', function (req, res) {
    if (req.session.username) {
        req.session.destroy();
    }
    res.status(200).json({ success: true, message: "Logout Successfully" });
});

router.post('/register', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    mongodb.connect(url, { useNewUrlParser: true });
    var db = mongodb.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
        var user = new userModel({
            username: req.body.username,
            password: req.body.password
        });
        // var user=new userModel(req.body.username,req.body.password);
        user.save(function (err, op) {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, msg: err.errmsg });
            }
            else {
                res.status(201).json({ success: true });
            }
        })

    });

});

module.exports = router;