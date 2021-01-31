const { addAdmin, loginAdmin, logoutAdmin } = require("../controllers/admin_controller")
const { addDosen, getAllDosen, deleteDosen, updateDosen, getDosenById } = require("../controllers/dosen_controller")
const { getAllKuisioner, getKuisionerById } = require("../controllers/kuisioner_controller")
const { addKuis } = require("../controllers/kuis_controller")
const { addMahasiswa, getAllMahasiswa, loginMhs, logoutMhs, getMhsLogin, getMhsById} = require("../controllers/mahasiswa_controller")
const { addPertanyaan, getAllPertanyaan, deleteKuisioner } = require("../controllers/pertanyaan_controller")
const { authMhs } = require("../middleware/authMhs")
const { authAdmin } = require("../middleware/authAdmin")

const router =  require("express").Router()


router.get("/", (req, res)=>{
    res.send("Selamat datang")
})
router.post("/admin/add_admin/", addAdmin)
router.post("/admin/login", loginAdmin)
// router.get("/admin/logout", authAdmin, logoutAdmin)

// ApiDosen
router.get("/dosen/", getAllDosen)
router.get("/dosen/:id", getDosenById)
router.post("/dosen/add_dosen/", addDosen)
router.delete("/dosen/delete_dosen/:id", deleteDosen)
router.put("/dosen/update_dosen/:id", updateDosen)

//apimahasiswa
router.post("/mahasiswa/login", loginMhs)
// router.get("/mahasiswa/logout", authMhs, logoutMhs)
router.get("/mahasiswa/", getAllMahasiswa)
router.get("/mahasiswa/:id", getMhsById)
router.post("/mahasiswa/add_mahasiswa/", addMahasiswa)
// router.get("/mahasiswa/profil", authMhs, getMhsLogin)

//apipertanyaan
router.get("/pertanyaan/", getAllPertanyaan)
router.post("/pertanyaan/add_pertanyaan/", addPertanyaan)

//apikuis
router.put("/kuis/add_kuis/:id", addKuis)

//apiKuisioner
router.get("/kuisioner/", getAllKuisioner)
router.get("/kuisioner/:id", getKuisionerById)
router.delete("/kuisioner/delete_kuisioner/:id", deleteKuisioner)

module.exports = router