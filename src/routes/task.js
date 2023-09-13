const express =require('express')
const taskController = require("../controller/taskController");
const router =express.Router();
router.get("/task", taskController.index)
router.get("/create", taskController.create)
router.post("/create", taskController.store)
router.post("/task/delete", taskController.destroy)
router.get("/task/edit/:id", taskController.edit)
router.post("/task/edit/:id", taskController.update)
module.exports=router;