const Sequelize = require('sequelize')
const connection = require('../database')

const questionTable = connection.define('question', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
},{})

questionTable.sync({force:false}).then(()=>{
    console.log("tabela criada.")
})

module.exports = questionTable;
