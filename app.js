const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")

const app = express()

//Passport config
require("./helpers/passport")(passport)

//DB connection
mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/olms", {
    useNewUrlParser: true
})

//Bodyparser
const urlencoder = bodyparser.urlencoded({
    extended: false
})

//Express Session 
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//HBS View Engine
app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public"))

app.use(require("./controllers"))

app.listen(3000, function(){
    console.log("live at port 3000")
})