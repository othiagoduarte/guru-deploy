"use strict";

module.exports = function (app) {
    function sucesso(data) {
        return {
            status: 200,
            data: data
        };
    }

    function naoAutorizado(data) {
        return {
            status: 401,
            data: data
        };
    }

    function naoEncontrado(data) {
        return {
            status: 404,
            data: data
        };
    }

    function erroServidor(data) {
        return {
            status: 501,
            data: data
        };
    }

    return { sucesso: sucesso, naoAutorizado: naoAutorizado, naoEncontrado: naoEncontrado, erroServidor: erroServidor };
};