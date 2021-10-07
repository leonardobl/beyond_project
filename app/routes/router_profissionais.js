const multer = require("multer")
const multerConfig = require("../../config/multer")
const router = require("express").Router()
const model_profissionais = require("../models/profissionais_DAO")
const model_categorias = require("../models/categoria_DAO")
const fs = require("fs")
const {promisify} = require("util")
const excluirFoto = promisify(fs.unlink)



router.post("/novo_profissional", multer(multerConfig).single("foto"), async (req, res) =>{
  var { nome, especialidade, num_cr, categoriaId, sigla, descricao } = req.body
  var {filename, path} = req.file
  nome = nome.split(" ").join(" ")

  model_profissionais.create({ nome, especialidade, num_cr, categoriaId, sigla, filename, path, descricao }).then(()=>{
    res.redirect("/novo_profissional")
  })
  
})

router.post("/update_profissional", multer(multerConfig).single("foto"), (req, res) => {
  var id = req.body.id
  var { nome, especialidade, num_cr, categoriaId, sigla, filename, path, descricao } = req.body
  nome = nome.trim()
  
  if(req.file){
    model_profissionais.findOne({where: {id}}).then( async prof => {
      await excluirFoto(prof.path)
      var { filename, path } = req.file
      model_profissionais.update( { nome, especialidade, num_cr, categoriaId, sigla, filename, path, descricao }, {where: {id}} ).then( ()=>{
        res.redirect("/novo_profissional")
      } )
    } )
  }
  else{
    model_profissionais.update( { nome, especialidade, num_cr, categoriaId, sigla, filename, path, descricao }, {where: {id}} ).then( ()=>{
      res.redirect("/novo_profissional")
    } )
  }
  
})

router.get("/novo_profissional", (req, res)=>{
  model_categorias.findAll().then( categorias =>{
    model_profissionais.findAll().then( profissionais => {
      res.render("admin/profissionais/new_professional", { categorias, profissionais })
    } )
  })
} )


router.get("/del_profissional/:id", (req, res) => {
  var id = req.params.id
  model_profissionais.findOne({ where: {id} }).then( prof => {
    var path = prof.path
    model_profissionais.destroy({ where: { id } }).then( async ()=>{
      await excluirFoto(path)
      res.redirect("/novo_profissional")
    } )
  } )
  
  
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