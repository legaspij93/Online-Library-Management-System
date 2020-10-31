const express = require("express")
const router = express.Router()
const Book = require("../models/book")
const User = require("../models/user")
const bodyparser = require("body-parser")
const passport = require("passport")
const logger = require("../config/logger")
const { ensureManager } = require("../helpers/auth")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/createBook", ensureManager, function(req,res){
    logger.info("Book Creation by: " + req.user.username)
    var book = {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        publicationYear: req.body.publicationYear,
        ISBN: req.body.ISBN
    }
    Book.create(book).then((book)=>{
        console.log(book)
        logger.info(book.title + " successfully created.")
        res.redirect("/dashboard")
    })
})

router.post("/editBook", ensureManager, function(req,res){
    logger.info("Book Edit by: " + req.user.username)
    let id = req.body.id;
    let title = req.body.title;
    let author = req.body.author;
    let publisher = req.body.publisher;
    let publicationYear = req.body.publicationYear;
    let ISBN = req.body.ISBN;

    res.redirect("/dashboard")
    logger.info(title + " successfully edited.")
    Book.edit({_id:id}, {title: title}, {author:author}, {publisher:publisher}, {publicationYear:publicationYear},
        {ISBN:ISBN})
})

router.get("/edit_:title", ensureManager, function(req,res){
    // logger.info("Book Edit by: " + req.user.username)
    let currTitle = req.params.title
    Book.findOne({title:currTitle}).then((book)=>{
        res.render("editBook.hbs", {
            currBook: book
        })
    })
    // logger.info(title + " successfully edited.")
    // Book.edit({_id:id}, {title: title}, {author:author}, {publisher:publisher}, {publicationYear:publicationYear},
    //     {ISBN:ISBN})
})

router.post("/deleteBook", ensureManager, function(req,res){
    let id = req.body.id;
    console.log(id)
    logger.info("Book Deleted by: " + req.user.username)
    Book.delete(id)
    logger.info("Successful Delete")
    res.redirect("/dashboard")
})

router.get("/:title", function(req,res){
    let currTitle = req.params.title
    let userId = req.user.ID
    console.log("title: "+currTitle)
    Book.findOne({title:currTitle}).then((book)=>{
        User.findOne({ID:userId}).then((user)=>{
            if(req.user.userType == 3){
                res.render("bookView.hbs", {
                    currBook:book,
                    users:user
                })
            }
            else if(req.user.userType == 2){
                res.render("managerBookView.hbs", {
                    currBook:book,
                    users:user
                })
            }
            else if(req.user.userType == 1){
                res.render("bookView.hbs", {
                    currBook:book,
                    users:user
                })
            }
        })
    })
    
})

module.exports = router