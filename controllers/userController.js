const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")
const passport = require("passport")
const { ensureAdmin } = require("../helpers/auth")

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

router.post("/register", function(req, res){
    var user = {
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        ID: req.body.ID,
        userType: 1
    }
    User.create(user).then((user)=>{
        console.log(user)
        res.redirect("/user/login") 
    })
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
    passport.authenticate('local',{
        successRedirect: "/dashboard",
        failureRedirect: "/user/login",
    })(req, res, next)
})

router.get("/logout", function(req,res){
    req.logout()
    res.redirect("/user/login")
})

module.exports = router