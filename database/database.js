const sequelize = require("sequelize")

const connection =  new sequelize('questions', 'root', 'artur166',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports =  connection