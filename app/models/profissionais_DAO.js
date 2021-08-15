const Banco = require("../../config/DB");
const sequelize = require("sequelize");
const model_categoria = require("../models/categoria_DAO")


const profissionais_DAO = Banco.Connect().define("profissionais", {
  nome: {
    type: sequelize.STRING,
    allowNull: false
  },
  especialidade: {
    type: sequelize.STRING,
    allowNull: false
  },
  num_cr: {
    type: sequelize.STRING,
    allowNull: false
  },
  sigla: {
    type: sequelize.STRING,
    allowNull: false
  },
  path: {
    type: sequelize.STRING,
    allowNull: false
  },  
  filename: {
    type: sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: sequelize.TEXT,
    allowNull: false
  }
})


profissionais_DAO.belongsTo(model_categoria)

profissionais_DAO.sync({ force: false })


module.exports = profissionais_DAO