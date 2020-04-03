const mongoose = require("mongoose")
const crypto = require("crypto")

var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    userType: {
        type: Number, //1 - admin, 2 - manager, 3 - student/teacher
        required: true
    } 
})

//add crypto usage here
userSchema.pre("save", function(next){
    this.password = crypto.createHash("md5").update(this.password).digest("hex")
    next()
})

var User = mongoose.model("user", userSchema)

exports.create = function(user){
    return new Promise(function(resolve, reject){
        console.log(user)
        var u = new User(user)

        u.save().then((newUser)=>{
            console.log(newUser)
            resolve(newUser)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        User.findOne({_id, id}).then((user)=>{
            console.log(user)
            resolve(user)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        User.find().then((users)=>{
            console.log(users)
            resolve(user)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.authenticate = function(user){
    return new Promise(function(resolve, reject){
        User.findOne({
            username : user.username,
            password : crypto.createHash("md5").update(user.password).digest("hex")
        }).then((user)=>{
            resolve(user)
        }, (err)=>{
            reject(err)
        })
    })
}

module.exports = User;