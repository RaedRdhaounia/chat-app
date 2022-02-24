const Validator = require('validator');
const isEmpty = require('is-empty');
module.exports = function validateupdateInput(data) {
    let errors = {};

    // Converts empty fields to String in order to validate them
    data.name = !isEmpty(data.name) ? data.name : '';
    data.pic = !isEmpty(data.pic) ? data.pic : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if (Validator.isEmpty(data.pic)) {
        errors.pic = 'path picture field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};