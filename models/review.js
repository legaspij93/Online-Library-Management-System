const mongoose = require("mongoose")
const logger = require("../config/logger")

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

exports.getAll = function(username){
    return new Promise(function(resolve, reject){
        Review.find({reviewerID:username}).then((reviews)=>{
            console.log(reviews)
            resolve(review)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.edit = function(oldContent, newContent){
    return new Promise(function(resolve, reject){
        Review.findOneAndUpdate(oldContent, newContent).then((review)=>{
            console.log("Update: " + review)
        })
    })
}

exports.delete = function (id){
    return new Promise(function(resolve, reject){
        Review.deleteOne({_id: id
        }).then((review)=>{
            console.log("Deleted: ",  review)
        },(err)=>{
            reject(err)
        })
    })
}