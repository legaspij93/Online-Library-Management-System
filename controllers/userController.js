const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")
const session = require('express-session')
const passport = require("passport")
const crypto = require("crypto")
const { ensureAdmin } = require("../helpers/auth")

const { check , validationResult } = require('express-validator')

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.get("/register", function(req,res){
    res.render("signup.hbs")
})

router.get("/login", function(req,res){
    res.render("login.hbs")
})

router.post("/register", [
    check('firstName').not().isEmpty().isAlpha().withMessage('First name is required'),
    check('firstName').isAlpha().withMessage('Input should be characters only'),
    check('lastName').isAlpha().withMessage('Last name is required'),
    check('lastName').not().isEmpty().isAlpha().withMessage('Input should be characters only'),
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({min: 8}).withMessage('Password should be at least 8 characters'),
    check('email').isEmail().withMessage('Email is required'),
    check('ID').not().isEmpty().isInt().withMessage('ID is required')
], function(req, res){
        var errors = validationResult(req).array()
        if(errors.length > 0){
            console.log("errors: " + validationResult(req).array().length)
            req.session.errors = errors
            req.session.success = false
            errors.forEach(element => {
                console.log(element)
            });
            res.redirect('./login')
        }else{
            console.log("creation success 1")
            req.session.success = true
            var user = {
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                ID: req.body.ID,
                userType: 2
            }
            User.create(user).then((user)=>{
                console.log(user)
                res.redirect("/user/login") 
            })
        }
        
})

router.post("/registerManager", ensureAdmin, function(req,res){
    var user = {
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        ID: req.body.ID,
        userType: 2
    }
    User.create(user).then((user)=>{
        console.log(user)
        res.redirect("/dashboard") 
    })
})

router.post("/login", function(req,res, next){
    req.session.username = req.body.username
    passport.authenticate('local',{
        successRedirect: "/dashboard",
        failureRedirect: "/user/login",
    })(req, res, next)
})

router.get("/logout", function(req,res){
    req.logout()
    res.redirect("/user/login")
})

router.post("/changePassword", function(req,res){
    let username = req.user._id;
    let password1 = req.body.password1;
    let password2 = req.body.password2;

    console.log(username)
    console.log(password1)
    console.log(password2)

    if(password1 == password2){
        User.findOneAndUpdate({_id:username}, {password: crypto.createHash("md5").update(password1).digest("hex")}).then((user)=>{
            console.log(user)
        })
    }
    res.redirect("/dashboard")
})

router.get("/profile", function(req,res){
    res.render("history.hbs")
})

router.get("/:username", function(req,res){
    let currUsername = req.user.username
    User.findOne({username:currUsername}).then((user)=>{
        res.render("history.hbs", user)
    })
    
})

module.exports = router