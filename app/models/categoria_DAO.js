const Banco = require("../../config/DB");
const sequelize = require("sequelize");

const categoria_DAO = Banco.Connect().define("categorias", {
  nome: {
    type: sequelize.STRING,
    allowNull: false
  }
})

categoria_DAO.sync( { force: false } )

module.exports = categoria_DAO