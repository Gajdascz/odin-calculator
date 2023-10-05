// @accumulator is the working total of the operation.
// @current is the current index.   


// Returns the sum of all numbers passed in as arguments.
let sum = (...nums) => nums.reduce((accumulator, current) => accumulator + current);

// Returns the difference of all numbers passed in as arguments.
let difference = (...nums) => nums.reduce((accumulator,current) => accumulator - current);