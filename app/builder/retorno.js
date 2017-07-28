module.exports = function (app) 
{
    function sucesso(data){
        return {
            status : 200,
            data : data
        }
    }
    
    function naoAutorizado(data){
        return {
            status : 401,
            data : data
        }
    }
    
    function naoEncontrado(data){
        return {
            status : 404,
            data : data
        }
    }

    function erroServidor(data){
        console.log(data);
        return {
            status : 500,
            data : "Um erro inesperado ocorreu, contate o adminstrador!"
        }
    }

    function erroValidacao(validacao){
        return {
            status : 406 ,
            data : validacao
        }
    }
    /** */
    return {sucesso, naoAutorizado, naoEncontrado, erroServidor, erroValidacao}
}