const mongoose = require("mongoose")

var bookSchema = mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    publictionYear: Date,
    ISBN: String,
    // reviews: String //subject to change
    coverImage: String
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

exports.edit = function(oldContent, newContent){
    return new Promise(function(resolve, reject){
        Book.findOneAndUpdate(oldContent, newContent).then((book)=>{
            console.log("Update: " + book)
        })
    })
}

exports.delete = function (id){
    return new Promise(function(resolve, reject){
        Book.deleteOne({_id: id
        }).then((book)=>{
            console.log("Deleted: ",  book)
        },(err)=>{
            reject(err)
        })
    })

}

module.exports = Book;