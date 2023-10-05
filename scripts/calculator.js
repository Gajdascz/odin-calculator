// @accumulator is the working total of the operation.
// @current is the current index.   


// Returns the sum of all numbers passed in as arguments.
const add = (...nums) => nums.reduce((accumulator, current) => accumulator + current);

// Returns the difference of all numbers passed in as arguments.
const subtract = (...nums) => nums.reduce((accumulator,current) => accumulator - current);

// Returns the product of all numbers passed in as arguments.
const multiply = (...nums) => nums.reduce((accumulator,current) => accumulator * current);

// Returns the quotient of all numbers passed in as arguments.
const divide = (...nums) => nums.reduce((accumulator,current) => accumulator / current);

// Returns the power of the base and exponent passed in as arguments.
const exponentiate = (base, exponent) => base ** exponent;