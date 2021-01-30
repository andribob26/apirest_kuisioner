const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

kuisSchema = mongoose.Schema({

    idDosen:{
        type: String
    },
    namaDosen:{
        type:String
    },
    hasilKuis:[
        {
            idMhs:{
                type:String
            },
            idKuisoner:{
                type:String
            },
            sangatBaik: {
                type: Number
            },
            baik: {
                type: Number
            },
            cukup: {
                type: Number
            },
            kurang: {
                type: Number
            },
            sangatKurang: {
                type: Number
            },
        }
        ],
    
    

})

kuisSchema.plugin(timestamps)

module.exports = mongoose.model("Kuis", kuisSchema)