const { validationResult } = require("express-validator");

const controller = {
    register: (req, res, next) => {
        res.render('index', { title: 'Formularios', mensajeDeError: "Por favor revise el formulario"})
    },
    processRegister: (req, res, next) => {
        const resultsValidation = validationResult(req);
        
        if (resultsValidation.errors.length > 0) {
            return res.render("index", {
                errors: resultsValidation.mapped(),
                oldData: req.body,
                title: 'Formularios',
                mensajeDeError: "Por favor revise el formulario"
            })
        }
    }
};

module.exports = controller