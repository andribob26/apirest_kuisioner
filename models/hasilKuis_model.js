const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

hasilKuisSchema = mongoose.Schema({

    idPertanyaan:{
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