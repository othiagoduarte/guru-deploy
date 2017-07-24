'use strict';

module.exports = function (app) {
    return {
        deleteDirR: function (_deleteDirR) {
            function deleteDirR(_x, _x2) {
                return _deleteDirR.apply(this, arguments);
            }

            deleteDirR.toString = function () {
                return _deleteDirR.toString();
            };

            return deleteDirR;
        }(function (path, cb) {
            var fs = require('fs');
            var files = [];
            var curPath = '';

            if (fs.existsSync(path)) {
                files = fs.readdirSync(path);

                files.forEach(function (file, index) {
                    curPath = path + '/' + file;

                    if (fs.lstatSync(curPath).isDirectory()) deleteDirR(curPath, cb);else fs.unlinkSync(curPath);
                });

                fs.rmdirSync(path);
                cb(null);
            } else {
                cb(new Error('The path passed does not exist.'));
            }
        })
    };
};