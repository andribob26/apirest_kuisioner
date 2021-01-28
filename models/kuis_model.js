const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

kuisSchema = mongoose.Schema({

    idDosen:{
        type: String
    },
    namaDosen:{
        type:String
    },
    pertanyaan:{
        type: String
    },
    hasilKuis:[
        {
            idPertanyaan:{
                type:String
            },
            sangatSuka: {
                type: Number
            },
            suka: {
                type: Number
            },
            tidakSuka: {
                type: Number
            },
        }
        ],
    
    

})

kuisSchema.plugin(timestamps)

module.exports = mongoose.model("Kuis", kuisSchema)