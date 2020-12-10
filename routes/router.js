const { addDosen, getAllDosen, deleteDosen } = require("../controllers/dosen_controller")

const router =  require("express").Router()


router.get("/", (req, res)=>{
    res.send("Selamat datang")
})

// ApiDosen
router.get("/dosen/", getAllDosen)
router.post("/dosen/add_dosen/", addDosen)
router.delete("/dosen/delete_dosen/id", deleteDosen)

module.exports = router