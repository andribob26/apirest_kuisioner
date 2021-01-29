const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")

kuisionerSchema = mongoose.Schema({

    judulKuisioner:{
        type: String
    },
    pertanyaan:[
        {
            judulPertanyaan:{
                type: String
            },
          
        }
        ],
    
    

})

kuisionerSchema.plugin(timestamps)

module.exports = mongoose.model("Kuisioner", kuisionerSchema)