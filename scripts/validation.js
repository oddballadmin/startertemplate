// validator.js

// Check if the value is filled out
const isRequired = input => {
    if (input == null) throw new Error('Input is null or undefined');
    return input.trim() !== '';
};

// Check the length of the input
const isLength = (input, min, max) => {
    if (!Number.isInteger(min) || !Number.isInteger(max))
        throw new Error('Min and max must be integers');
    return input.length >= min && input.length <= max;
};

// Check if the input is a valid email address
const isValidEmail = input => {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return re.test(input);
};

// Check if the input is a valid phone number
const isValidPhone = input => {
    const re = /^\+(?:[0-9] ?){6,14}[0-9]$/; // International phone format
    return re.test(input);
};

// Check if the input is a number
const isNumber = input => !isNaN(parseFloat(input)) && isFinite(input);

// Export the modules in a way that's compatible with both browser and Node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { isRequired, isLength, isValidEmail, isValidPhone, isNumber };
} else {
    window.validator = { isRequired, isLength, isValidEmail, isValidPhone, isNumber };
}
