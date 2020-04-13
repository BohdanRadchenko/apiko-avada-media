const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String},
    photoId: {type: String, required: true},
    price: {type: String},
    photo: {data: Buffer, contentType: String},
    date: { type: Date, default: Date.now },
    user: {type: Types.ObjectId, ref: 'Users'}
})

module.exports = model('Products', schema)