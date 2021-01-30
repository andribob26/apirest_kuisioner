const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

DosenSchema = mongoose.Schema({

    namaDosen:{
        type: String
    },
    nip:{
        type: Number
    },
    noTelepon:{
        type: Number
    },
    email:{
        type: String
    },
    kuisioner:[
        {
            idMhs:{
                type:String
            },
            namaMhs:{
                type:String
            },
            idKuisioner:{
                type:String
            },
            judulKuisioner:{
                type:String
            },
            hasilKuis:[
                {
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
            ]
        }
        ],

})

DosenSchema.plugin(timestamps)

module.exports = mongoose.model("Dosen", DosenSchema)