const Kuis = require("../models/kuis_model")
const HasilPer = require("../models/hasilKuis_model")
exports.addKuis = async (req, res)=>{
    
    var kuis = new Kuis(
            {   
                idDosen: req.body.idDosen,
                namaDosen: req.body.namaDosen,
                pertanyaan: req.body.pertanyaan,
            }
        );
    await kuis.save().then(async (doc)=>{
        // console.log(req.body.hasilKuis);
           await Kuis.findByIdAndUpdate(doc._id , { $push: { hasilKuis: req.body.hasilKuis } },  {new: true}).then(async(doc)=>{
            var hasilKuis = []
            for(var i = 0; i < doc.hasilKuis.length; i++){
                    // let produkStok = await HasilPer.findById(doc.produk[i].id)
                    // let newStok = produkStok.stok - doc.produk[i].jumlah
                // await HasilPer.findByIdAndUpdate(doc.hasilKuis[i].id, {stok: newStok}, {new: true})
                hasilKuis.push(
                        {
                            idPertanyaan: doc.hasilKuis[i].idPertanyaan,
                            sangatSuka: doc.hasilKuis[i].sangatSuka,
                            suka: doc.hasilKuis[i].suka,
                            tidakSuka: doc.hasilKuis[i].tidakSuka
                        }
                    )
            }

            const kuisData = {
                id: doc._id,
                idDosen: doc.idDosen,
                namaDosen: doc.namaDosen,
                pertanyaan: doc.pertanyaan,
                hasilKuis: hasilKuis,
            }

            res.status(200).json({
                success: true,
                message: "Berhasil transaksi",
                kuisData: kuisData
            })

           })

        //    console.log(req.body.hasilPer[0]);
        //         var hasilKuis = []
                
        //         for(var i = 0; i < doc.hasilKuis.length; i++){
        //             // let produkStok = await HasilPer.findById(doc.produk[i].id)
        //             // let newStok = produkStok.stok - doc.produk[i].jumlah
        //             await HasilPer.findByIdAndUpdate(doc.hasilKuis[i].id, {stok: newStok}, {new: true})
        //             hasilKuis.push(
        //                     {
        //                         idPertanyaan: doc.hasilKuis[i].idPertanyaan,
        //                         sangatSuka: doc.hasilKuis[i].sangatSuka,
        //                         suka: doc.hasilKuis[i].suka,
        //                         tidakSuka: doc.hasilKuis[i].tidakSuka
        //                     }
        //                 )
        //         }

        //         const kuisData = {
        //             id: doc._id,
        //             idDosen: doc.idDosen,
        //             namaDosen: doc.namaDosen,
        //             pertanyaan: doc.pertanyaan,
        //             hasilKuis: hasilKuis,
        //         }

                
        //         res.status(200).json({
        //             success: true,
        //             message: "Berhasil transaksi",
        //             kuisData: kuisData
        //         })
        //     }).catch((err)=>{
        //         res.json({
        //             error: "wadul"
        //         })
        //     })

        //
        
    })
    // .catch((err)=>{
    //     res.json({
    //         error: err
    //     })
    // })
}