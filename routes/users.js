var express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require("passport");
const users = require('../controllers/users');

router.route('/register')
    .get(catchAsync(users.renderRegister))
    .post(catchAsync(users.register))

router.route('/login')
    .get(catchAsync(users.renderLogin))
    .post(passport.authenticate('local',{failureFlash:true, failureRedirect: '/login'}), catchAsync(users.login))

router.get("/logout", catchAsync(users.logout));

module.exports = router;
