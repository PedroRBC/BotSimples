const { Schema, model } = require('mongoose')

const Guild = Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    name: String,
    prefix: {
        default: '!',
        type: String
    }
})

module.exports = model('Guild', Guild)
