var express = require('express');
//Importation du controller
var controller = require('./controller/controller.js');
var app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));
controller(app);
app.listen(3000);
console.log('Vous ecoutez sur le port 3000');