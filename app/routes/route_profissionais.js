const multer = require("multer")
const multerConfig = require("../../config/multer")
const router = require("express").Router()
const model_profissionais = require("../models/profissionais_DAO")
const model_categorias = require("../models/categoria_DAO")



router.post("/novo_profissional", multer(multerConfig).single("foto"), async (req, res) =>{
  var { nome, especialidade, num_cr, categoriaId, sigla, descricao } = req.body
  var filename = req.file.filename
  
  model_profissionais.create({ nome, especialidade, num_cr, categoriaId, sigla, filename, descricao }).then(()=>{
    res.redirect("/novo_profissional")
  })
  
})

router.post("/update_profissional", (req, res) => {
  var { filename } = req.body
  console.log(filename)
  res.redirect("/novo_profissional")
})

router.get("/novo_profissional", (req, res)=>{
  model_categorias.findAll().then( categorias =>{
    model_profissionais.findAll().then( profissionais => {
      res.render("admin/profissionais/new_professional", { categorias, profissionais })
    } )
  })
} )


router.get("/edit_profissional/:id", (req, res) => {
  var id = req.params.id
  model_profissionais.findOne({ where: {id} }).then( prof => {
    model_categorias.findAll().then( categorias => {
      res.render("admin/profissionais/edit_profissional", { prof, categorias })
    } )
  } )
})


router.get("/profissionais", (req, res) =>{
  model_categorias.findAll().then( categorias => {
    model_profissionais.findAll({ include: model_categorias }).then( profissionais => {
      res.render("profissionais", { categorias, profissionais })
    } )
  } )
})





module.exports = router