const Sequelize = require('sequelize')
const connection = require('../database')

const answerTable = connection.define('answer', {
    resposta:{
        type: Sequelize.STRING,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

answerTable.sync({force:false})

module.exports = answerTable;