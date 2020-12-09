const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const router = require("./routes/router")

const db = require("./config/config").database
const port = process.env.PORT || 5050


app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(router)


mongoose.Promise = global.Promise
mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server berjalan di port: ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})
