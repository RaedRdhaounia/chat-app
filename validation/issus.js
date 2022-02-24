const Validator = require('validator');
const isEmpty = require('is-empty');
module.exports = function validateIssusInput(data) {
    let errors = {};

    // Converts empty fields to String in order to validate them
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.body = !isEmpty(data.body) ? data.body : '';

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'email field is required';
    }
    if (Validator.isEmpty(data.body)) {
        errors.body = 'request  field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
