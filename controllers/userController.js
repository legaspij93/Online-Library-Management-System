const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")
const session = require('express-session')
const passport = require("passport")
const crypto = require("crypto")
const logger = require("../config/logger")
const { ensureAdmin } = require("../helpers/auth")

const { check , validationResult } = require('express-validator')
const { info } = require("console")
const Book = require("../models/book")
const BookInstance = require("../models/bookInstance")
const History = require("../models/history")
const Review = require("../models/review")

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
    // check('firstName').not().isEmpty().isAlpha().withMessage('First name is required'),
    check('firstName').notEmpty().withMessage('First name is required'),
    check('firstName').custom((value,{req})=>{
        if(isNaN(value)){
            return true;
        }else{
            throw new Error('Input should be characters only')
        }
    }),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('lastName').custom((value,{req})=>{
        if(isNaN(value)){
            return true;
        }else{
            throw new Error('Input should be characters only')
        }
    }),
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({min: 8}).withMessage('Password should be at least 8 characters'),
    check('email').isEmail().withMessage('Email is required'),
    check('ID').not().isEmpty().isInt().withMessage('ID is required')
], function(req, res){
        logger.info("User registration:")
        var errors = validationResult(req).array()
        if(errors.length > 0){
            console.log("errors: " + validationResult(req).array().length)
            req.session.errors = errors
            req.session.success = false
            logger.error("User creation unsuccessful")
            logger.error("Number of errors: " + validationResult(req).array().length)
            errors.forEach(element => {
                console.log(element)
                logger.error(element)
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
                userType: 3
            }
            User.create(user).then((user)=>{
                console.log(user)
                logger.info("Successfully created user: " + user.username)
                res.redirect("/user/login") 
            })
        }
        
})

router.post("/registerManager", ensureAdmin, [
    // check('firstName').not().isEmpty().isAlpha().withMessage('First name is required'),
    check('firstName').notEmpty().withMessage('First name is required'),
    check('firstName').custom((value,{req})=>{
        if(isNaN(value)){
            return true;
        }else{
            throw new Error('Input should be characters only')
        }
    }),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('lastName').custom((value,{req})=>{
        if(isNaN(value)){
            return true;
        }else{
            throw new Error('Input should be characters only')
        }
    }),
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({min: 8}).withMessage('Password should be at least 8 characters'),
    check('email').isEmail().withMessage('Email is required'),
    check('ID').not().isEmpty().isInt().withMessage('ID is required')
], function(req,res){
    logger.info("User registration:")
    var errors = validationResult(req).array()
    if(errors.length > 0){
        console.log("errors: " + validationResult(req).array().length)
        req.session.errors = errors
        req.session.success = false
        logger.error("User creation unsuccessful")
        logger.error("Number of errors: " + validationResult(req).array().length)
        errors.forEach(element => {
            console.log(element)
            logger.error(element)
        });
        res.redirect('./login')
    } 
    else{
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
            logger.info("Successfully created user: " + user.username)
            res.redirect("/dashboard") 
        })
    }
})

router.post("/login", function(req,res, next){
    req.session.username = req.body.username
    passport.authenticate('local',{
        successRedirect: "/dashboard",
        failureRedirect: "/user/login",
    })(req, res, next)
})

router.post("/guest-login", function(req,res){
    req.session.username = "Guest"
    //res.render()     this will be redirecting to a different page/dashboard
})

router.get("/logout", function(req,res){
    logger.info("User: " + req.session.username + " has logged out")
    req.logout()
    res.redirect("/user/login")
})

router.post("/changePassword", function(req,res){
    let username = req.user.username;
    let oldPW = req.body.oldPW;
    let newPW = req.body.newPW;

    console.log(username)
    console.log("utot")
    console.log(oldPW)
    console.log(newPW)

    User.findOne({username:currUsername}, {password: crypto.createHash("md5").update(oldPW).digest("hex")}).then((user)=>{
        User.edit({_id: user.id}, {password: crypto.createHash("md5").update(newPW).digest("hex")})
    
    })
    // User.findOneAndUpdate({_id:username}, {password: crypto.createHash("md5").update(newPW).digest("hex")}).then((user)=>{
        // console.log(user)
    // })
    
    res.redirect("/dashboard")
})

router.get("/profile", function(req,res){
    res.render("history.hbs")
})

router.get("/:username", function(req,res){
    let currUsername = req.user.username
    console.log(currUsername)
    User.findOne({username:currUsername}).then((user)=>{
    //     History.getAll({user:currUsername}).then((history)=>{
    //         Review.getAll({reviewerId:currUsername}).then((reviews)=>{
    //             BookInstance.getAll({instanceID:history.instanceID}).then((books)=>{
    //                 res.render("history.hbs",{
    //                     firstName: user.firstName,
    //                     lastName: user.lastName,
    //                     ID: user.ID,
    //                     email: user.email,
    //                     username: user.username,
    //                     curr_history: history,
    //                     curr_review: reviews,
    //                     curr_books: books
    //                 })
    //                 console.log("books successfully loaded")
    //             }, (error)=> {
    //                 console.log("error loading books");
    //                 logger.error("Error loading books: " + error)
    //             })
    //             console.log("reviews successfully loaded")
    //         }, (error)=>{
    //             console.log("error loading reviews");
    //             logger.error("Error loading reviews: " + error)
    //         })
    //         console.log("history successfully loaded")
    //     }, (error)=>{
    //         console.log("error loading history");
    //         logger.error("Error loading history: " + error)
    //     })
        res.render("history.hbs", user)
    })
    
})

module.exports = router