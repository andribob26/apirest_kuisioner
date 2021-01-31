const Pertanyaan = require("../models/pertanyaan_model");
const Kuisioner = require("../models/kuisioner_model");
const Dosen = require("../models/dosen_model");

// exports.addPertanyaan = async (req, res)=>{

//     var pertanyaan = new Pertanyaan(
//             {
//                 pertanyaan: req.body.pertanyaan,
                
//             }
//         );
//     await pertanyaan.save().then(async (doc)=>{

//         console.log(doc)
//             const pertanyaanData = {
//                 pertanyaan: doc.pertanyaan,
              

//             }
//             res.status(200).json({
//                 success: true,
//                 message: "Dosen berhasil di tambahkan",
//                 pertanyaanData

//             })

//     }).catch((err)=>{
//         res.json({
//             error: err
//         })
//     })
// }

exports.addPertanyaan = async (req, res)=>{


    var kuisioner = new Kuisioner(
        {   
            judulKuisioner: req.body.judulKuisioner,
        }
    );
await kuisioner.save().then(async (doc)=>{
    // console.log(req.body.hasilKuis);
       await Kuisioner.findByIdAndUpdate(doc._id , { $push: { pertanyaan: req.body.pertanyaan } },  {new: true}).then(async(doc)=>{
        var pertanyaan = []
        for(var i = 0; i < doc.pertanyaan.length; i++){
                // let produkStok = await HasilPer.findById(doc.produk[i].id)
                // let newStok = produkStok.stok - doc.produk[i].jumlah
            // await HasilPer.findByIdAndUpdate(doc.hasilKuis[i].id, {stok: newStok}, {new: true})
            pertanyaan.push(
                    {
                        judulPertanyaan: doc.pertanyaan[i].judulPertanyaan,
                    }
                )
        }


        const kuisionerData = {
            id: doc._id,
            judulKuisioner: doc.judulKuisioner,
            pertanyaan: pertanyaan,
        }

        res.status(200).json({
            success: true,
            kuisionerData: kuisionerData
        })

        

       })
    
})
}

exports.getAllPertanyaan = async(req, res)=>{
    await Pertanyaan.find({}, (err, pertanyaan)=>{
        const pertanyaanData = []
        for(let i = 0; i < pertanyaan.length; i++){
            pertanyaanData.push({
                id: pertanyaan[i]._id,
                pertanyaan : pertanyaan[i].pertanyaan,
                updatedAt: pertanyaan[i].updatedAt,
                createdAt: pertanyaan[i].createdAt
            }) 
        }

        if(err){
            res.status(400).json({
                success: false,
                message: "Gagal memuat data!"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Berhasil memuat data",
                pertanyaanData
            })
        }
    })   
}

exports.deleteKuisioner = async(req, res)=>{
    // console.log(req.params.id)
    await Dosen.find({}, (err, dosen)=>{
    
        
        for (let i = 0; i < dosen.length; i++) {
            
            for (let j = 0; j < dosen[i].kuisioner.length; j++) {
            
             
                // console.log(dosen[i].kuisioner[j]);
                if (req.params.id == dosen[i].kuisioner[j].idKuisioner) {
                    console.log("jalan")
                    console.log(dosen[i].kuisioner[j].idKuisioner)
                    Dosen.findByIdAndUpdate(dosen[i]._id , { $pull: { kuisioner: {idKuisioner:dosen[i].kuisioner[j].idKuisioner} } },  {new: true}).then(async(doc)=>{
                      ///
                      Kuisioner.findByIdAndRemove(req.params.id)
                        .then((kuisioner)=>{
                            if(!kuisioner){
                                res.status(404).json({
                                    status: false,
                                    message: "Data dosen tidak di temukan"
                                })
                            }else{
                                res.status(200).json({
                                    status: true,
                                    message: "Berhasil hapus data",
                                })
                            }
                        }).catch((err)=>{
                            res.json({
                                error: err
                            })
                        })
                        ////
                     
                    }).catch((err)=>{
                        res.json({
                            error: err
                        })
                    });
                    
                }

                Kuisioner.findByIdAndRemove(req.params.id)
                        .then((kuisioner)=>{
                            if(!kuisioner){
                                res.status(404).json({
                                    status: false,
                                    message: "Data dosen tidak di temukan"
                                })
                            }else{
                                res.status(200).json({
                                    status: true,
                                    message: "Berhasil hapus data",
                                })
                            }
                        }).catch((err)=>{
                            res.json({
                                error: err
                            })
                        })

              
            }
        }

        // console.log(req.params.id)


    })   
}