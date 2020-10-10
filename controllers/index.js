const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require("../helpers/auth")
const User = require("../models/user")
const Book = require("../models/book")
const logger = require("../config/logger")

const app = express()

router.use("/user", require("./userController"))
router.use("/book", require("./bookController"))
router.use("/instance", require("./bookInstanceController"))
router.use("/review", require("./reviewController"))

router.get("/", function(req,res){
    console.log("GET /")
    // res.send("Hello")
    res.redirect("/dashboard")
})

router.get("/dashboard", ensureAuthenticated, function(req,res){
    let userId = req.user.ID
    User.findOne({ID:userId}).then((user)=>{
            if(req.user.userType == 3){
                logger.info("Rendering dashboard")
                Book.find().then((books)=>{
                    res.render("dashboard", {
                      users: user, 
                      book: books
                    })
                    console.log("books successfully loaded")
                    console.log(req.body)
                  }, (error)=> {
                    console.log("error loading books");
                    logger.error("Error loading books: " + error)
                  })
                // res.render("dashboard.hbs", user)
            }
            else if(req.user.userType == 1){
                res.render("adminDash.hbs", user)
            }
            else if(req.user.userType == 2){
                res.render("managerDash.hbs", user)
            }
        }, (error)=> {
            console.log("may error dito: " + error);
            logger.error("Error getting dashboard: " + error)
        }
    )
})

module.exports = router