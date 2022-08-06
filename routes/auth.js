const express = require('express');
const router = express.Router();
const AuthController = require ("../controllers/AuthController")



router.post('/register', AuthController.store);
router.get('/register', AuthController.login);



module.exports = router;
