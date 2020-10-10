const{createLogger, transport, format, transports, level} = require('winston');
require('winston-mongodb');
const mongoose = require('mongoose');
const { collection } = require('../models/book');
mongoose.Promise = global.Promise
const conn = mongoose.createConnection("mongodb://localhost:27017/olms_logs", {
    useNewUrlParser: true
})
const logger = createLogger({
    transports: [
        // new transports.Console({
        //     level: 'info',
        //     format: format.combine(format.timestamp(), format.json)
        // }),
        new transports.MongoDB({
            level:'error',
            options: {useUnifiedTopology: true},
            db: "mongodb://localhost:27017/olms_logs",
            collection: 'errors',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'info',
            options: {useUnifiedTopology: true},
            db: "mongodb://localhost:27017/olms_logs",
            collection: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ],
    exceptionHandlers: [
        new transports.MongoDB({
            db: "mongodb://localhost:27017/olms_logs",
            collection: 'exceptions',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});

module.exports = logger;