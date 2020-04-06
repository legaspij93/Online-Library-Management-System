const express = require("express")
const router = express.Router()
const Book = require("../models/book")
const bodyparser = require("body-parser")
const passport = require("passport")
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
        ISBN: req.body.ISBN,
        status: 0
    }
    Book.create(book).then((book)=>{
        console.log(book)
        res.redirect("/dashboard")
    })
})

module.exports = router