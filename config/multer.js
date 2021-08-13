const multer = require("multer")
const path = require("path")
const crypto = require("crypto")


module.exports = {
  
  dest: path.resolve(__dirname, "..", "app", "public","img", "uploads"),

  storage: multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.resolve(__dirname, "..", "app", "public","img", "uploads")) },
    filename: (req, file, cb) => { 
      crypto.randomBytes(16, (err, hash)=> {
        if(err) cb(err)
        const fileName = `${hash.toString("hex")}-${file.originalname}`
        cb(null, fileName)
      } )
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/*"]

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    }else{
      cb(new Error("Invalid file type"))
    }
  }
  
}