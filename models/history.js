const mongoose = require("mongoose")

var historySchema = mongoose.Schema({
    user: String,
    instanceID: String,
    borrowDate: Date,
    duration: Number,
    returned: Boolean
})

var History = mongoose.model("history", historySchema)

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        History.find().then((history)=>{
            resolve(history)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        History.findOne({instanceID: id}).then((history)=>{
            resolve(history)
        })
    })
}

exports.add = function(history){
    return new Promise(function(resolve, reject){
        var h = new History(history)

        h.save().then((newHistory)=>{
            console.log(newHistory)
            resolve(newHistory)
        }, (err)=>{
            reject(err)
        })
    })
}