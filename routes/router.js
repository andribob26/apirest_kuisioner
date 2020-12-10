const { getAllGuru, addGuru } = require("../controllers/guru_controller")


const router =  require("express").Router()


router.get("/", (req, res)=>{
    res.send("Selamat datang")
})

// ApiGuru
router.get("/guru/", getAllGuru)
router.post("/guru/addguru/", addGuru)

module.exports = router