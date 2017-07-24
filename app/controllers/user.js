const _ = require('underscore');       
const mongoose = require('mongoose');     
const jwt = require("jwt-simple");
const cfg = { jwtSecret: "secret",jwtSession: {session: true}};
module.exports = function(app)
{
    const UserBd = app.models.user;		
    const AlunoBd = app.models.aluno;		
    const ProfessorBd = app.models.professor;
    const emailRecuperacaoSenha = app.lib.emailRecuperacaoSenha;	
    const R = app.builder.retorno;

    async function getById(req, res){
        
        if (!req.params.id) {
            return R.naoEncontrado("Usuario não encontrado!");
        }
        const where = {_id:req.params.id};
        const user = await UserBd.findOne(where);

        if(!user){
           return  R.naoEncontrado("Usuario não encontrado!");
        }
        return R.sucesso(user);    	 
    }
    
    async function login (req, res) {
        try {
            if (validarParametrosLogin(req)) {
                return R.naoAutorizado("Parametros inválidos"); 
            }

            let user = null;
            let userData = null;
            
            user = await UserBd.findOne({"email" : req.body.email});

            if(! validarUsuario(user, req.body.password)){
                return R.naoAutorizado("e-mail ou senha inválido");
            } 
            if (ehProfessor(user)){
                userData = await ProfessorBd.findOne({"user._id": mongoose.Types.ObjectId(user._id)});
            }else if(ehAluno(user)){
                userData = await AlunoBd.findOne({"user._id":mongoose.Types.ObjectId(user._id)});
            }else{
                return R.naoAutorizado("Usuario inválido, contate o admininstrador!");
            }
            return R.sucesso(builderAutenticacao(user, userData));
        }
        catch(error){
            return R.erroServidor(error);
        }        
  }

    async function recuperarSenha(req, res){
        const where = {};
        let user = null;

        if(!req.body.cpf && !req.body.email) {
            return R.naoAutorizado("Parametros inválidos"); 
        }
        
        if(req.body.email)  where.email = req.body.email; 
        if(req.body.cpf)  where.cpf = req.body.cpf; 
        
        user = await UserBd.findOne(where);

        if(!user) {
            return R.naoAutorizado("Usuario não encontrado");
        }
        
        emailRecuperacaoSenha.enviar(user.email, user.password);

        return R.sucesso("Sua senha foi enviada para o e-mail cadastrado!");
    }
    
    function validarParametrosLogin(req){
        return !( req.body.email || req.body.password);
    }

    function validarUsuario(usuario, password){
        return (usuario && usuario.password && password && usuario.password == password);     
    }
    
    function builderAutenticacao(user, userData){
        const payload = {id: user.id};
        const token = jwt.encode(payload, cfg.jwtSecret);
        return {
            token: token, 
            user: user, 
            userData:userData
        }
    }

    function ehProfessor(user){
        return user.perfil == 'PROFESSOR' || user.perfil == 'COORDENADOR' ;
    }
    
    function ehAluno(user){
        return user.perfil == 'ALUNO';
    }
    
    return {login, getById, recuperarSenha};
};