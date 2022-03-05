var express = require('express');
var router = express.Router();
const multer = require("multer");
var path = require('path');

const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, "./public/images/avatar");
  },

  filename: (req, file, cb) => {
    //console.log(file)
    let fileName = `${Date.now()}_img${path.extname(file.originalname)}`; 
    cb(null, fileName); 
  } 
});

const uploadFile = multer({storage});

const usersControllers = require("../controllers/userController");
const validations = require("../middlewares/validador")

/* Formulario de registro. */

router.get('/register', usersControllers.register);

/*Procesar el registro*/
router.post('/register', uploadFile.single("avatar"), validations, usersControllers.processRegister);

module.exports = router;


/*function(req, res, next) {
res.render('index', { title: 'Formularios' });*/