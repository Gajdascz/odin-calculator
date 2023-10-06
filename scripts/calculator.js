// @accumulator is the working total of the operation.
// @current is the current index.   

// Returns the sum of all numbers passed in as arguments.
const add = (...nums) => nums.reduce((accumulator, current) => (accumulator + current));

// Returns the difference of all numbers passed in as arguments.
const subtract = (...nums) => nums.reduce((accumulator,current) => (accumulator - current));

// Returns the product of all numbers passed in as arguments.
const multiply = (...nums) => nums.reduce((accumulator,current) => (accumulator * current));

// Returns the quotient of all numbers passed in as arguments.
const divide = (...nums) => nums.reduce((accumulator,current) => (accumulator / current));

// Returns the power of the base and exponent passed in as arguments.
const exponentiate = (base, exponent) => (base ** exponent);

// Returns the product of all numbers up to the passed argument num.
const factorial = (num) => (num === 0 || num === 1) ?  1: (num * factorial(num-1));

// Returns percentage of input per-hundred
const percentage =(num) => (num/100);

// Returns the remainder of dividend and divisor passed in as arguments. 
const modulo = (dividend, divisor) => (dividend % divisor);

function operate(numOne=0,numTwo=0,operator) {
  if ( (typeof(operator) !== `undefined`) ) {
    let result = 0;
    switch(operator) {
      case `+`:
        result = add(numOne,numTwo);
        break;
      case `-`:
        result = subtract(numOne,numTwo);
        break;
      case `*`:
        result = multiply(numOne,numTwo);
        break;
      case `/`:
        result = divide(numOne,numTwo);
        break;
      case `^`:
        result = exponentiate(numOne,numTwo);
        break;
      case `!`:
        result = factorial(numOne);
        break;
      case `%`:
        result = percentage(numOne);
        break;
      case `MOD`:
        result = modulo(numOne,numTwo);
        break;
    }
    return result;
  }
  return numOne;
}