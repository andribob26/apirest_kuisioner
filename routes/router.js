const { addDosen, getAllDosen, deleteDosen } = require("../controllers/dosen_controller")
const { addPertanyaan, getAllPertanyaan } = require("../controllers/pertanyaan_controller")

const router =  require("express").Router()


router.get("/", (req, res)=>{
    res.send("Selamat datang")
})

// ApiDosen
router.get("/dosen/", getAllDosen)
router.post("/dosen/add_dosen/", addDosen)
router.delete("/dosen/delete_dosen/id", deleteDosen)

//apipertanyaan
router.get("/pertanyaan/", getAllPertanyaan)
router.post("/pertanyaan/add_pertanyaan/", addPertanyaan)

module.exports = router