const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require("../helpers/auth")
const User = require("../models/user")

const app = express()

router.use("/user", require("./userController"))
router.use("/book", require("./bookController"))
router.use("/instance", require("./bookInstanceController"))

router.get("/", function(req,res){
    console.log("GET /")
    res.send("Hello")
})

router.get("/dashboard", ensureAuthenticated, function(req,res){
    let userId = req.user.ID
    User.findOne({ID:userId}).then((user)=>{
            if(req.user.userType == 3){
                res.render("dashboard.hbs", user)
            }
            else if(req.user.userType == 1){
                res.render("adminDash.hbs", user)
            }
            else if(req.user.userType == 2){
                res.render("managerDash.hbs", user)
            }
        }, (error)=> {
            console.log("may error dito: " + error);
        }
    )
})

module.exports = router