const express = require("express")
const router = express.Router()
const model_categoria = require("../models/categoria_DAO")

router.get("/nova_categoria", (req, res) => {
  model_categoria.findAll({ raw: true }).then( categorias => {
    res.render("categoria/new_categoria", { categorias })
  } )
})


router.get("/del_categoria/:id", (req, res)=>{
  var id = req.params.id
  model_categoria.destroy({ where: {id} }).then( ()=>{
    res.redirect("/nova_categoria")
  } )
})

router.post("/update_categoria", ( req, res ) =>{
  var { id, nome } = req.body
  model_categoria.update( { nome }, { where : { id } } ).then( ()=>{
    res.redirect("/nova_categoria")
  } )
})


router.get("/edit_categoria/:id", (req, res) => {
  var id = req.params.id
  model_categoria.findOne({ where: {id} }).then( categoria =>{
    res.render("categoria/edit_categoria", { categoria })
  } )
} )




router.post("/nova_categoria", (req, res) => {
  
  var categoria = req.body.categoria.toLowerCase()
  nome = (categoria.charAt(0).toUpperCase() + categoria.slice(1)).trim()
  model_categoria.create({nome}).then( ()=>{
    res.redirect("/nova_categoria")
  } )
  
})


module.exports = router