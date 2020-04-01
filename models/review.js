const mongoose = require("mongoose")

var reviewSchema = mongoose.Schema({
    title: String,
    reviewerID: String,
    review: String
})

var Review = mongoose.model("review", reviewSchema)

exports.create = function(review){
    return new Promise(function(resolve, reject){
        console.log(review)
        var r = new Review(review)

        r.save().then((newReview)=>{
            console.log(newReview)
            resolve(newReview)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Review.findOne({_id:id}).then((review)=>{
            console.log(review)
            resolve(review)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Review.find().then((reviews)=>{
            console.log(reviews)
            resolve(review)
        }, (err)=>{
            reject(err)
        })
    })
}