// sanitizer.js

// Import the validation functions
const { isRequired, isLength, isValidEmail, isValidPhone, isNumber } =
    typeof require !== 'undefined' ? require('./validator') : window.validator;

// Data sanitizer function
const sanitizeData = (input, type, min = null, max = null) => {
    if (input == null) throw new Error('No input provided');

    let sanitizedInput = input;

    switch(type) {
        case 'string':
            if (isRequired(input) && isLength(input, min, max)) {
                sanitizedInput = input.trim().replace(/[<>]/g, ''); // Remove script tags
            } else {
                throw new Error('Invalid string input');
            }
            break;
        case 'email':
            if (isValidEmail(input)) {
                sanitizedInput = input.toLowerCase().trim();
            } else {
                throw new Error('Invalid email input');
            }
            break;
        case 'phone':
            if (isValidPhone(input)) {
                sanitizedInput = input.replace(/\s/g, ''); // Removes any white space
            } else {
                throw new Error('Invalid phone number input');
            }
            break;
        case 'number':
            if (isNumber(input)) {
                sanitizedInput = parseFloat(input);
            } else {
                throw new Error('Invalid number input');
            }
            break;
        default:
            throw new Error(`Invalid type: ${type}`);
    }

    return sanitizedInput;
}

// Export the module in a way that's compatible with both browser and Node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { sanitizeData };
} else {
    window.sanitizer = { sanitizeData };
}
