const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email : {type : String, required: true, unique: true},
    password : {type : String, required: true},
    name : {type : String, required: true},
    phone : {type : String},
    location: { type: String, default: 'Jakarta, Indonesia' },
    favorites: [{type: Types.ObjectId, ref : 'Products'}],
    products: [{type: Types.ObjectId, ref : 'Products'}]
})

module.exports = model('User', schema)