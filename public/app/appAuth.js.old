'use strict';
  /** @ngInject */
var app = angular.module('Auth',[]);

app.controller('loginCtrl', function($scope,$http,$window) {
    
    $window.sessionStorage.clear();
    
    $scope.login = login;
    $scope.data = {};

    function login(){
        
        var url = "http://localhost:3008/login";

        if($scope.data && $scope.data.password != "" && $scope.data.email !="" ){      
            $http.post(url, $scope.data)
            .then(sucessoLogin)
            .catch(erroLogin);
        }
    }
    
    function erroLogin(res){
        console.log(res);
        if(res.data.retorno){
            alert(res.data.retorno);
        }
    }

    function sucessoLogin(res){
        
        if(res.data.user._id){
        
            $window.sessionStorage.token = res.data.token ;
            $window.sessionStorage.perfil = res.data.user.tipo;
            $window.sessionStorage.user = res.data.user._id;
            $window.sessionStorage.userData = JSON.stringify(res.data.userData);
            $window.location.href ="/" ;

        }else{

        }
    }
});