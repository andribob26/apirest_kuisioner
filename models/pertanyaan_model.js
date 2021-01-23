const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

PertanyaanSchema = mongoose.Schema({

    pertanyaan:{
        type: String
    },

})

PertanyaanSchema.plugin(timestamps)

module.exports = mongoose.model("Pertanyaan", PertanyaanSchema)