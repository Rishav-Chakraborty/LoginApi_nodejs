var joi = require("joi");

const LoginValidation = data => {
    const schema = {
        email: joi
            .string()
            .min(6)
            .required()
            .email(),
        password: joi
            .string()
            .min(6)
            .required()
            .alphanum()
    };
    return ({
        value,
        error
    } = joi.validate(data, schema));
};
module.exports = LoginValidation;