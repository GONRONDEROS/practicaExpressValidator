const path = require("path");
const { check } = require("express-validator");

const validations = [
    check("name").notEmpty().withMessage("Tienes que escribir un Nombre"),
    check("surname").notEmpty().withMessage("Tienes que escribir un Apellido"),
    check("email").notEmpty().withMessage("Tienes que escribir un E-mail").bail()
    .isEmail().withMessage("Debes escribir un formato de correo valido"),
    check("password").notEmpty().withMessage("Tienes que escribir una Contraseña"),
    check("country").notEmpty().withMessage("Tienes que elegir un Pais"),
    check("avatar").custom((value, {req}) => { 
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif"];
        
        if (!file) {
            throw new Error("Tienes que subir una imagen");
        } else {
            let fileExtensions = path.extname(file.originalname); 

            if (!acceptedExtensions.includes(fileExtensions)) {
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(", ")}`);
            }
        }
        return true;
    })
];

module.exports = validations;
