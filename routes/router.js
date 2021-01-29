const { addDosen, getAllDosen, deleteDosen, updateDosen } = require("../controllers/dosen_controller")
const { getAllKuisioner, getKuisionerById } = require("../controllers/kuisioner_controller")
const { addKuis } = require("../controllers/kuis_controller")
const { addPertanyaan, getAllPertanyaan } = require("../controllers/pertanyaan_controller")

const router =  require("express").Router()


router.get("/", (req, res)=>{
    res.send("Selamat datang")
})

// ApiDosen
router.get("/dosen/", getAllDosen)
router.post("/dosen/add_dosen/", addDosen)
router.delete("/dosen/delete_dosen/:id", deleteDosen)
router.put("/dosen/update_dosen/:id", updateDosen)

//apipertanyaan
router.get("/pertanyaan/", getAllPertanyaan)
router.post("/pertanyaan/add_pertanyaan/", addPertanyaan)

//apikuis
router.post("/kuis/add_kuis/", addKuis)

//apiKuisioner
router.get("/kuisioner/", getAllKuisioner)
router.get("/kuisioner/:id", getKuisionerById)

module.exports = router