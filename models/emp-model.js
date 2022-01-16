const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        position: {type: String, required:true },
        gender: {type: String, required:true},
        tel: { type: Number, required: true },
        email: {type: String, required: true},
        date: {type: Date, required:true},
        url: {type: String, required:true},
        city: {type: String, required:true}, 
        openKey: {type:String, required:true},
        description: {type:String, required:true},
        password:{type:String, required:true},
        color: {type:String, required:true},
        maritialStatus: {type:String, required:true}

    },
    { timestamps: true },
)

module.exports = mongoose.model('employees', Employee)

