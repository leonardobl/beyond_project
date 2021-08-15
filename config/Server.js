const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const router_profissionais = require("../app/routes/route_profissionais")
const router_home = require("../app/routes/route_home")
const router_categoria = require("../app/routes/router_categoria")
const router_admin = require("../app/routes/router_admin")


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("app/public"))
app.set("views", "app/public/views")
app.use(express.json())
app.set("view engine", "ejs")
app.use("/", router_profissionais)
app.use("/", router_home)
app.use("/", router_categoria)
app.use("/", router_admin)



module.exports = app