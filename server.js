require('./config/database.js')('mongodb://localhost/gurudb');
require('./config/express')();


/*

http.createServer(app).listen(app.get('port'),app.get('host'),function(){
    console.log('Express running in port: ' + app.get('port'));
	console.log('Express running in host: ' + app.get('host'));
    
});
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/