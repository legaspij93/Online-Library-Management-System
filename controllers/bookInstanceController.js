const express = require("express")
const router = express.Router()
const BookInstance = require("../models/bookInstance")
const bodyparser = require("body-parser")
const passport = require("passport")
const { ensureManager } = require("../helpers/auth")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/createInstance", ensureManager, function(req,res){
    var bookInstance = {
        title: req.body.title,
        dueDate: req.body.dueDate,
        status: req.body.status
    }
    BookInstance.create(bookInstance).then((bookInstance)=>{
        console.log(bookInstance)
        res.redirect("/dashboard")
    })
})

router.post("/editInstance", ensureManager, function(req,res){
    let id = req.body.id;
    let dueDate = req.body.dueDate;
    let status = req.body.status;

    BookInstance.edit({_id:id}, {dueDate:dueDate}, {status:status})
    res.redirect("/dashboard")
})

router.post("/deleteInstance", ensureManager, function(req,res){
    let id = req.body.id;
    console.log(id)

    BookInstance.delete(id)

    res.redirect("/dashboard")
})

router.post("/borrowBook", function(req,res){
    let id = req.body.id;
    let status = 1;

    BookInstance.edit({_id:id}, {status: status})
    res.redirect("/dashboard")
})

module.exports = router