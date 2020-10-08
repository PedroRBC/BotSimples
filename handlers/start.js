const mongoose = require('mongoose');
const { mongodbip, mongodbport } = require('../config.json')
const MarryModel = require('../models/marry')

module.exports = async (client)  =>  {
    let mongourl = `mongodb://${mongodbip}:${mongodbport}/botMarry`
    await mongoose.connect(mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }, console.log('MongoDb Conection: Successful'))

}
