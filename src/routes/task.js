// Importa Express y el controlador de tareas ("taskController")
const express = require('express'); // Importa Express, un framework web para Node.js
const taskController = require("../controller/taskController"); // Importa el controlador de tareas

// Crea un enrutador de Express
const router = express.Router();

router.get("/", taskController.login);
router.post("/", taskController.authenticate);
router.get("/register", taskController.showRegister);
router.post("/register", taskController.register);
router.get("/task", taskController.index);
router.get("/create", taskController.create);
router.post("/create", taskController.store);
router.post("/task/delete", taskController.destroy);
router.get("/task/edit/:id", taskController.edit);
router.post("/task/edit/:id", taskController.update);
router.get("/logout", taskController.logout);

// Exporta el enrutador para que pueda ser utilizado por otros archivos
module.exports = router;
