const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/olms", {
    useNewUrlParser: true
})

const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public"))

app.use(require("./controllers"))

app.listen(3000, function(){
    console.log("live at port 3000")
})