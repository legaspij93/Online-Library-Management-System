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
    },
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil: Number
})

//add crypto usage here
userSchema.pre("save", function(next){
    this.password = crypto.createHash("md5").update(this.password).digest("hex")
    next()
})

userSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});
userSchema.methods.incrementLoginAttempts = function(callback) {
    const maxAttempts = 3;
    const lockoutHours = 60 * 1000;
    console.log("lock until",this.lockUntil)
    // if we have a previous lock that has expired, restart at 1
    var lockExpired = !!(this.lockUntil && this.lockUntil < Date.now());
    console.log("lockExpired",lockExpired)
    if (lockExpired) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, callback);
    }
    // otherwise we're incrementing
    var updates = { 
        $inc: { 
            loginAttempts: 1 
        } 
    };
    // lock the account if we've reached max attempts and it's not locked already
    var needToLock = !!(this.loginAttempts + 1 >= maxAttempts && !this.isLocked);
    console.log("needToLock",needToLock)
    console.log("loginAttempts",this.loginAttempts)
    if (needToLock) {
        updates.$set = { 
            lockUntil: Date.now() + lockoutHours 
        };
        console.log("lockoutHours",Date.now() + lockoutHours)
    }
    //console.log("lockUntil",this.lockUntil)
    return this.update(updates, callback);
};

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