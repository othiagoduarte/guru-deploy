var jwt = require("jwt-simple");
var cfg = { jwtSecret: "secret",jwtSession: {session: true}};
var mongoose = require('mongoose');     
var _ = require('underscore');       
module.exports = function(app)
{
	var User = app.models.user;		
    var Aluno = app.models.aluno;		
    var Professor = app.models.professor;
    var _emailRecuperacaoSenha = app.lib.emailRecuperacaoSenha;			
    
	var controller = {};

    controller.login = login;
    controller.getById = getById;
    controller.recuperarSenha = recuperarSenha;

    function getById(req, res){
        
        if (req.params.id) {
            var _id = req.params.id;
            var where = {_id:_id}
          
            User.findOne(where)
    	    .then(function(users){
      	        
      	        if(users){
      			    res.json({user: users});
      				
      			}else{
      				res.status(404).json({retorno:"Usuario não encontrado"});
      			}
    
      		},function(erro){
      			res.status(404).json({retorno:erro});
      		});
    
        } else {
            res.sendStatus(404);
        }
    }

    function login (req, res) {

        if (! ( req.body.email || req.body.password)) {
            res.sendStatus(401);
        }
            
        var where = {"email" : req.body.email};
            
        User.findOne(where)
    	.then(function(users){
            
            var _user = users._doc;
            var _tipo = users._doc.tipo;
            var _id = users.id;
            
      	    if(! users){
      		    res.status(401).json({retorno:"Usuario não encontrado"});
            }
                
            if(_user.password != req.body.password){
                res.status(401).json({retorno:"Senha inválida"});
            }

            if (_tipo == "ALUNO"){
                
                Aluno.findOne({"user._id":mongoose.Types.ObjectId(_id)})
                .then(function(alunos){
                    
                    if(alunos){
                        var payload = {id: _user.id};
                        var token = jwt.encode(payload, cfg.jwtSecret);
                        res.json({token: token, user: _user, userData:alunos._doc});
                    }
                    else{
                            res.status(401).json({retorno:"Dados do Usuario não encontrado"});
                        }
                    }
                    , function(error){
                        res.status(401).json({retorno:"Dados do Usuario não encontrado"});
                    });
                }
                    
                if (_tipo == "PROFESSOR" || _tipo == "COORDENADOR" ){
                    
                    Professor.findOne({"user._id":mongoose.Types.ObjectId(_id)})
                    .then(function(Professores){
                        
                        if(Professores){
                            var payload = {id: users.id};
                            var token = jwt.encode(payload, cfg.jwtSecret);
                            res.json({token: token, user: users, userData:Professores._doc});
                        }
                        else{
                            res.status(401).json({retorno:"Dados do Usuario não encontrado"});
                        }
                    }
                    , function(error){
                        res.status(401).json({retorno:"Dados do Usuario não encontrado"});
                    });
                }
    
      		},function(erro){
      			res.status(401).json({retorno:erro});
      		});
    }

    function recuperarSenha(req, res){
        var where = {};
        if(!req.body.cpf && !req.body.email) {
            res.status(401).json({retorno:"Dados inválidos!"});
            return ;
        }
        if(req.body.email)  where.email = req.body.email; 
        if(req.body.cpf)  where.cpf = req.body.cpf; 
        
        User.findOne(where)
    	.then(function(users){
            if(! users){
      		    res.status(401).json({retorno:"Usuario não encontrado"});
                return ;
            }
            
            _emailRecuperacaoSenha.enviar(users._doc.email, users._doc.password);

            res.status(200).json({retorno:"Sua senha foi enviada para o e-mail cadastrado!"});
        },function(erro){
            res.status(401).json({retorno:erro});
        });
    }
    
    return controller;

};