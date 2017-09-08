const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//connect to mongo

mongoose.connect('mongodb://localhost/meditation' , { useMongoClient: true });

app.use(express.static("public"));
app.use(bodyParser.json());



app.use('/api', require('./routes/api'));
app.use('/', require('./routes/html'));

//error handeling
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
})












app.listen(process.env.port || 3000, function(){
    console.log('listening...');
});