const express = require("express")
const router = express.Router()
const BookInstance = require("../models/bookInstance")
const bodyparser = require("body-parser")
const passport = require("passport")
const { ensureManager } = require("../helpers/auth")
const logger = require("../config/logger")

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
        logger.info("Book Instance Creation by: " + req.user.username)
        console.log(bookInstance)
        logger.info(bookInstance.title + " successfully created.")
        res.redirect("/dashboard")
    })
})

router.post("/editInstance", ensureManager, function(req,res){
    let id = req.body.id;
    let dueDate = req.body.dueDate;
    let status = req.body.status;

    BookInstance.edit({_id:id}, {dueDate:dueDate}, {status:status})
    logger.info(id + " successfully edited.")
    res.redirect("/dashboard")
})

router.post("/deleteInstance", ensureManager, function(req,res){
    let id = req.body.id;
    console.log(id)
    logger.info("Book Instance Deleted by: " + req.user.username)
    BookInstance.delete(id)
    logger.info(id + " successfully deleted.")
    res.redirect("/dashboard")
})

router.post("/borrowBook", function(req,res){
    let id = req.body.id;
    let status = 1;
    BookInstance.edit({_id:id}, {status: status})
    logger.info(id + " borrowed by: " + req.user.username)
    res.redirect("/dashboard")
})

module.exports = router