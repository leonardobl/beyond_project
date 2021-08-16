const express = require("express")
const router = express.Router()
const model_profissionais = require("../models/profissionais_DAO")


router.get("/", (req, res) => {
  model_profissionais.findAll({limit:8}).then( profissionais => {
    res.render("index", { profissionais })
  } )
})



module.exports = router