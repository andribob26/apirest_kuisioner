const {Admin} = require('../models/admin_model')

exports.addAdmin = (req, res)=>{
    let admin = new Admin({
        namaAdmin: req.body.namaAdmin,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role

    })
    admin.save((err, doc)=>{
        if(err){
            return res.json({
                error:err
            })
        }else{
            const adminData = {
                namaAdmin: doc.namaAdmin,
                username: doc.username,
                password: doc.password,
                role: doc.role
           
            }
            return res.status(200).json({
                success:true,
                message: 'Berhasil di tambahkan',
                adminData
            })
        }
    })
}

exports.loginAdmin = (req, res)=>{
    Admin.findOne({
        'username': req.body.username
    }, (err, admin)=>{
        if(!admin){
            return res.status(404).json({
                success: false,
                message: 'Username tidak di temukan'
            })
        }else{
            admin.comparePassword(req.body.password, (err, isMatch) =>{
                console.log(isMatch)
                if(!isMatch){
                    return res.status(400).json({
                        success: false,
                        message: 'User password salah!'
                    })
                }else{
                    admin.generateToken((err, admin)=>{
                        if(err){
                            return res.status(400).send({err})
                        }else{
                            const data = {
                                idAdmin: admin._id,
                                namaAdmin: admin.namaAdmin,
                                username: admin.username,
                                role: admin.role,
                                token: admin.token
                            }
                            res.cookie('authTokenAdmin', admin.token).status(200).json({
                                success:true,
                                message:'Login berhasil',
                                adminData: data
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.logoutAdmin = (req, res) =>{
    console.log(req.token)
    Admin.findByIdAndUpdate(
        { _id: req.admin._id }, { token: '' },{new: true},
        (err) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({ success: true, message: "Logout berhasil" });})
}