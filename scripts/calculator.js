// Returns the sum of all numbers passed in as arguments.
// @accumulator is the working sum and @current is the current index.   
let sum = (...nums) => nums.reduce((accumulator, current) => accumulator + current, 0);