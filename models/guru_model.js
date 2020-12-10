const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

GuruSchema = mongoose.Schema({

    namaGuru:{
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

GuruSchema.plugin(timestamps)

module.exports = mongoose.model("Guru", GuruSchema)