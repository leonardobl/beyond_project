class Banco{
  
  static Connect(){
    const sequelize = require("sequelize")
    return new sequelize("beyondtherapy", "leonardo", "TH@27*as", {
      host: "localhost",
      dialect: "mysql",
      timezone: "-03:00"
    })
  }

}

module.exports = Banco