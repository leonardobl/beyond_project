const express = require("express")
const router = express.Router()
const model_admim = require("../models/admin_DAO")



router.get("/admin", (req, res) => {
  res.render("admin/login")
  
})

router.post("/admin/login", (req, res) => {
  var { nome, senha } = req.body
  model_admim.findOne({ where: {nome, senha} }).then( user => {
    if(user){
      res.redirect("/novo_profissional")
    }
    else{
      res.redirect("/admin")
    }
  })
})






module.exports = router