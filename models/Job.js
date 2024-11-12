const {Schema, model} = require('mongoose');

const Job = new Schema({
    company: {type: String},
    vacancy: {type: String},
    gross: {type: String},
    isOpen: {type: Boolean},
    note: {type: String},
})

module.exports = model('Job', Job);