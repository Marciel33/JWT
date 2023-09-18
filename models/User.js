const Sequilize = require ('sequelize');
const db = require('./db');

const User = db.define('users',{

    id:{
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true        
    },//
    nome:{
        type:Sequilize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequilize.STRING,
        allowNull: false,
    },
    password:{
        type:Sequilize.STRING,
        allowNull: false,
    }
    

});


//criar tabela
//User.sync();
 module.exports = User;
