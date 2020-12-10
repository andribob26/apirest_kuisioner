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
    alamat:{
        type: String
    },

})

DosenSchema.plugin(timestamps)

module.exports = mongoose.model("Dosen", DosenSchema)