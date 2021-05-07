const mongoose = require("mongoose")
const logger = require("../config/logger")

var bookInstanceSchema = mongoose.Schema({
    title: String,
    instanceID: String,
    dueBack: Date,
    status: Boolean //0 for available, 1 for reserved
})

var BookInstance = mongoose.model("bookInstance", bookInstanceSchema)

exports.create = function(bookInstance){
    return new Promise(function(resolve, reject){
        console.log(bookInstance)
        var b = new BookInstance(bookInstance)

        b.save().then((newInstance)=>{
            console.log(newInstance)
            resolve(newInstance)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        BookInstance.findOne({_id:id}).then((bookInstance)=>{
            resolve(bookInstance)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(instanceId){
    return new Promise(function(resolve, reject){
        BookInstance.find({instanceID:instanceId}).then((bookInstances)=>{
            resolve(bookInstances)
        }, (err)=>{
            reject(err)
        }, (error)=>{
            console.log(error)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        BookInstance.find().then((bookInstances)=>{
            resolve(bookInstances)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.edit = function(oldContent, newContent){
    return new Promise(function(resolve, reject){
        BookInstance.findOneAndUpdate(oldContent, newContent).then((bookInstance)=>{
            console.log("Update: " + bookInstance)
        })
    })
}

exports.delete = function (id){
    return new Promise(function(resolve, reject){
        BookInstance.deleteOne({_id: id
        }).then((bookInstance)=>{
            console.log("Deleted: ",  bookInstance)
        },(err)=>{
            reject(err)
        })
    })

}