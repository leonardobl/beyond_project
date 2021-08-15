const sequelize = require("sequelize")
const Banco = require("../../config/DB")

const admin_DAO = Banco.Connect().define("usuarios", {
  nome: {
    type: sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: sequelize.STRING,
    allowNull: false
  }
})

admin_DAO.sync({ force: false })


module.exports = admin_DAO