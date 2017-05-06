module.exports = function(app)
{
return { 
    
        copy: function(source, target, cb) {
            var fs = require('fs');
            var cbCalled = false;
            var wr;
            var rd;

            var _done = function (err) {
                if (!cbCalled) {
                    cb(err);
                    cbCalled = true;
                }
            };

            rd = fs.createReadStream(source);
            rd.on("error", function(err) {
                _done(err);
            });

            wr = fs.createWriteStream(target);
            wr.on("error", function(err) {
                _done(err);
            });
            wr.on("close", function(ex) {
                _done();
            });

            rd.pipe(wr);
        }
    }
}
