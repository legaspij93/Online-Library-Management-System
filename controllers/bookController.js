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
    var book = {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        publicationYear: req.body.publicationYear,
        ISBN: req.body.ISBN
    }
    Book.create(book).then((book)=>{
        console.log(book)
        res.redirect("/dashboard")
    })
})

router.post("/editBook", ensureManager, function(req,res){
    let id = req.body.id;
    let title = req.body.title;
    let author = req.body.author;
    let publisher = req.body.publisher;
    let publicationYear = req.body.publicationYear;
    let ISBN = req.body.ISBN;

    res.redirect("/dashboard")
    Book.edit({_id:id}, {title: title}, {author:author}, {publisher:publisher}, {publicationYear:publicationYear},
        {ISBN:ISBN})
})

router.post("/deleteBook", ensureManager, function(req,res){
    let id = req.body.id;
    console.log(id)

    Book.delete(id)

    res.redirect("/dashboard")
})

router.get("/:title", function(req,res){
    let currTitle = req.params.title
    let userId = req.user.ID
    console.log("title"+currTitle)
    Book.findOne({title:currTitle}).then((book)=>{
        User.findOne({ID:userId}).then((user)=>{
            res.render("bookView.hbs", {
                currBook:book,
                users:user
            })
        })
    })
    
})

module.exports = router