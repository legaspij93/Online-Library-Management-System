const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")
const passport = require("passport")

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
        userType: 3
    }
    User.create(user).then((user)=>{
        console.log(user)
        //res.render("") *insert login screen hbs here*
    })
})

// router.post("/login", function(req, res){
//     var user = {
//         username : req.body.username,
//         password : req.body.password
//     }
    
//     User.authenticate(user).then((newUser)=>{
//         if(newUser){
//             console.log("worked")
//             //res.redirect("") *redirect to home screen*
//         }
//     }, (err)=>{
//         res.sendFile(err)
//     })
// })

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