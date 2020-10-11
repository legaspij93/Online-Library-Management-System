const express = require("express")
const router = express.Router()
const History = require("../models/history")
const bodyparser = require("body-parser")
const passport = require("passport")
const { ensureManager } = require("../helpers/auth")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/createHistory", ensureManager, function(req,res){
    var history = {
        user : req.session.email,
        instanceID: req.body.ID, 
        borrowDate: (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear(),
        duration: req.body.duration,
        returned: false
    }
    History.create(history).then((history)=>{
        console.log(history)
        //res.redirect()
    })
})

module.exports = router