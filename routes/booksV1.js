const express = require('express');
const router = express.Router();
const BooksV1Controller = require ("../controllers/BooksV1Controller")
const verifyToken = riqueri("../middlewares/verifyToken")


router.get("/books", BooksV1Controller.list);
router.get("/books/:id", BooksV1Controller.getOneBook);

router.use(verifyToken);
router.post("/books", BooksV1Controller.store);//~criar
router.put("/books/:id", BooksV1Controller.update);
router.delete("/books/:id", BooksV1Controller.delete);


module.exports = router;
