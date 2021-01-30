const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

hasilKuisSchema = mongoose.Schema({

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

})

hasilKuisSchema.plugin(timestamps)

module.exports = mongoose.model("HasilKuis", hasilKuisSchema)