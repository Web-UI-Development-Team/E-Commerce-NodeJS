const express = require('express');
const app = express();
const router = express.Router();
const controllers = require('../controllers/books.controller');

router.get("/", controllers.getAllBooks);

router.get("/:id", controllers.getBooksById);

router.post("/", controllers.createBook);

router.patch("/:id", controllers.updateBook);

router.delete("/:id", controllers.deleteBook);

module.exports = router;