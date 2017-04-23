var jwt = require("jwt-simple");
var cfg = { jwtSecret: "secret",
            jwtSession: {session: true}
            };
var mongoose = require('mongoose');            
module.exports = function(app)
{
	var User = app.models.user;		
    var Aluno = app.models.aluno;		
    var Professor = app.models.professor;		
    
	var controller = {};

    controller.login = login;
    controller.getById = getById;
    
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
        if (req.body.email && req.body.password) {
          var where = {"email" : req.body.email};
            User.findOne(where)
    	    .then(function(users){
      	        
      	        if(users){
                    
                    var _tipo = users._doc.tipo;
                    var _id = users.id;
                    var _user = users._doc;

                    if(_user.password != req.body.password){
                        res.status(401).json({retorno:"Senha inválida"});
                    }
                    else{
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
                    } 

      			}else{
      				res.status(401).json({retorno:"Usuario não encontrado"});
      			}
    
      		},function(erro){
      			res.status(401).json({retorno:erro});
      		});
    
        } else {
          res.sendStatus(401);
        }
      }
       
      return controller;
};