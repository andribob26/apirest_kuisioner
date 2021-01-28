const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

hasilKuisSchema = mongoose.Schema({

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

})

hasilKuisSchema.plugin(timestamps)

module.exports = mongoose.model("HasilKuis", hasilKuisSchema)