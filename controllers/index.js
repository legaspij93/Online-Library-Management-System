const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require("../helpers/auth")

const app = express()

router.use("/user", require("./userController"))
router.use("/book", require("./bookController"))
router.use("/instance", require("./bookInstanceController"))

router.get("/", function(req,res){
    console.log("GET /")
    res.send("Hello")
})

router.get("/dashboard", ensureAuthenticated, function(req,res){
    if(req.user.userType == 3){
        res.render("dashboard.hbs")
    }
    else if(req.user.userType == 1){
        res.render("adminDash.hbs")
    }
    else if(req.user.userType == 2){
        res.render("managerDash.hbs")
    }
})

module.exports = router