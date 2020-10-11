const express = require("express")
const router = express.Router()
const Review = require("../models/review")
const bodyparser = require("body-parser")
const passport = require("passport")
const { ensureManager } = require("../helpers/auth")
const logger = require("../config/logger")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/createReview", ensureManager, function(req,res){
    var review = {
        title: req.body.title,
        reviewerID: req.user.ID,
        review: req.body.review
    }
    Review.create(review).then((review)=>{
        console.log(review)
        logger.info(review.title + " created by: " + req.user.username)
        //res.redirect()
    })
})

module.exports = router