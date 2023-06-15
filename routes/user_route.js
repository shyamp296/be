const path = require("path");

const express = require("express");

const router = express.Router();
const userController = require("../controllers/user_controller")
const upload = require("../middleware/upload")


router.post("/users", upload.single("profile"), userController.addUser);
router.get("/users/:id", userController.getOneUser );
router.put("/users/:id", upload.single("profile"), userController.editUser );
router.delete("/users/:id", userController.deleteUser );
router.get("/users", userController.getUser );
router.get("/exportCsv", userController.exportCsv)

module.exports = router