const express = require("express");
const { authController } = require("../controller/authController.js");
const { authMiddleware , isOwned } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/current", authMiddleware, userController.get);

router.get("/posts", postController.index);
router.get("/posts/:postId", postController.get);

router.post("/posts", authMiddleware, postController.create);
router.put("/posts/:postId", authMiddleware, isOwned, postController.update);
router.delete("/posts/:postId", authMiddleware, isOwned, postController.remove);

module.exports = router;