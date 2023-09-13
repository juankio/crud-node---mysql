const express = require("express");
const { engine } = require("express-handlebars");
const myconnection = require("express-myconnection");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const taskRotas= require("./routes/task");
const app = express();
app.set("port", 4000);
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname:'.hbs',
}));

app.set('view engine', 'hbs');

app.use(myconnection(mysql,{
    host:"localhost",
    user: "root",
    password:"W@2915djkq#",
    port:3306,
    database:"crudnode"
}))

app.listen(app.get("port"), () => {
  console.log("predido el purto", app.get("port"));
});

app.use('/',taskRotas);
app.get('/', (req, res)=>{
  res.render('home');
})
