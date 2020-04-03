const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require("../helpers/auth")

const app = express()

router.use("/user", require("./userController"))

router.get("/", function(req,res){
    console.log("GET /")
    res.send("Hello")
})

router.get("/dashboard", ensureAuthenticated, function(req,res){
    res.render("dashboard.hbs")
})

module.exports = router