const jwt = require('jsonwebtoken');
const {promisify} = require('util');

module.exports = { 
    eAdmin: async function (req, res, next){
        const authHeader = req.headers.authorization;
        
        if (!authHeader){
            return res.status(400).json({
                error: true,
                mensagem:"poxa deu  ERRO: Necessário realizar o login para acessar a página A!"
            }); 

        }
        const [, token ] = authHeader.split(' ');
        console.log( "token: " + token);
        if (!token){
            return res.status(400).json({
                erro: true,
                mensagem:"poxa deu  ERRO: Necessário realizar o login para acessar a página B!"
            });
        }
        try {
            const decode = await promisify(jwt.verify)(token, "Oliveir@3788");
            req.userId = decode.id;
            return  next();

        }catch(err){
            return  res.status(400).json({
                erro:true,
                mensagem:"ERRO: Nevessário realizar o login  para acessar a página ! "
            });

        }
    }
} 