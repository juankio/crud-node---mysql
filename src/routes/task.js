const express =require('express')
const taskController = require("../controller/taskController");
const router =express.Router();
router.get("/task", taskController.index)
router.get("/create", taskController.create)
router.post("/create", taskController.store)
module.exports=router;