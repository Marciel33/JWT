const express = require('express');
const app = express();
const JWT= require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const { eAdmin } = require('./middleware/auth'); 
const User =  require('./models/User');

app.use(express.json());



app.get('/',eAdmin,async(req, res )=> {

    await User.findALL ({
        attributes:['id', 'nome','email'],
        order: [['id', 'DESC']]
    })

    .then((users) => {
        return res.json({
            erro: false,
            users,
            id_usuario_logado: req.userId
        });
    }).catch(()=>{
        return res.status(400).json({
            erro: true, 
            mensagem:"ERRO:Nenhum usuario encontrado" 
        });

    

});
    
});

app.post('/cadastrar', async (req, res) => {
    console.log(req.body);
    var dados = req.body;

                             // senha do usuário cadastrado
    dados.password = await bcrypt.hash(dados.password, 8);



    await User.create(dados)
    .then(() => {
        return res.json({
            erro:false,
            mensagem: "cadastro realizado com sucesso!!"
        });

    }).catch(() => {
        return res.status(400).json({
            erro:true,
            mensagem: " ERRO: ao  realizado cadastro!!"
        });
    }); 
    
});

    

app.post('/login', async (req, res) => {
    
    const user = await User.findOne({
        attributes:['id','nome','email','password'],
        where:{
            email:req.body.email
        }
    });

    if (user === null){
        return res.status(400).json({
            erro: true, 
            mensagem:"ERRO:USUÁRIO OU SENHA INCORETO" 
        });
    }  

                                               // minha chave token
    if(!(await bcrypt.compare(req.body.password, user.password))){

        return res.status(400).json({
            erro: true,
            mensagem:"ERRO:USUÁRIO OU SENHA INCORETO" 
        }); 
    }   

                                       //chave secreta
    var token = JWT.sign({id: user.id},"Oliveir@3788",{
    
        // este é o tempo  para expirar o token
        expiresIn:1200 
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso ",
        token:token
    });  
});    

app.listen(3000,() => {
    console.log('Servidor iniciado na porta 3000: http://localhost:3000');
});  