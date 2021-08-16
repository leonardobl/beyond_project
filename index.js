const app = require("./config/Server")




const porta = 80
app.listen(process.env.PORT || porta, ()=> console.info(`Servidor em http://localhost:${porta}`))