// Importación de las librerías necesarias
const express = require("express"); // Importa Express, un framework  para Node.js
const { engine } = require("express-handlebars"); // Importa el motor de plantillas Handlebars para Express
const myconnection = require("express-myconnection"); // Importa un middleware para manejar conexiones a bases de datos con Express
const bodyParser = require("body-parser"); // Importa un middleware para parsear los cuerpos de las solicitudes HTTP
const mysql = require("mysql"); // Importa el módulo de MySQL para Node.js
const taskRotas = require("./routes/task"); // Importa las rutas definidas en el archivo task.js

// Metodo de express
const app = express(); // Crea una instancia de la aplicación Express

// Configuración de la aplicación
app.set("port", 4000); // Establece el puerto en el que la aplicación va a escuchar
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para parsear los cuerpos de las solicitudes con URL codificada
app.use(bodyParser.json()); // Middleware para parsear los cuerpos de las solicitudes JSON
app.set('views', __dirname + '/views'); // Establece la ubicación de las plantillas de vistas
app.engine('.hbs', engine({ extname: '.hbs' })); // Configura el motor de plantillas Handlebars
app.set('view engine', 'hbs'); // Establece el motor de plantillas que se utilizará

// Configuración de la conexión a la base de datos MySQL
app.use(myconnection(mysql, {
    host: "localhost", 
    user: "root", 
    password: "W@2915djkq#", 
    port: 3306, 
    database: "crudnode" // Nombre de la base de datos
}));

// Inicia el servidor y lo hace escuchar en el puerto especificado
app.listen(app.get("port"), () => {
  console.log("El servidor está escuchando en el puerto", app.get("port"));
});

// Establece el enrutamiento para las rutas definidas en taskRotas
app.use('/', taskRotas);
 
// Ruta principal que renderiza la vista 'home'
app.get('/', (req, res) => {
  res.render('home');
});
