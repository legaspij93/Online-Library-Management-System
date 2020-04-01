const mongoose = require("moongose")

var bookSchema = mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    publictionYear: Date,
    ISBN: String,
    status: Boolean, //0 for available, 1 for reserved
    // reviews: String //subject to change
})

var Book = mongoose.model("book", bookSchema)

exports.create = function(book){
    return new Promise(function(resolve, reject){
        console.log(book)
        var b = new Book(book)

        b.save().then((newBook)=>{
            console.log(newBook)
            resolve(newBook)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Book.findOne({_id:id}).then((book)=>{
            resolve(book)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Book.find().then((books)=>{
            resolve(books)
        }, (err)=>{
            reject(err)
        })
    })
}