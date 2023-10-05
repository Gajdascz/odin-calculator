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
const exponentiate = (base, exponent) => (base ** exponent);

// Returns the product of all numbers up to the passed argument num.
const factorial = (num) => (num === 0 || num === 1) ?  1: num * factorial(num-1);

// Returns percentage of input per-hundred
const percentage =(num) => (num/100);

// Returns the remainder of dividend and divisor passed in as arguments. 
const modulo = (dividend, divisor) => (dividend%divisor);

function operate(numOne,numTwo=0,operator) {
  if (numOne > 0){
    switch(operator) {
      case `+`:
        add(numOne,numTwo);
        break;
      case `-`:
        subtract(numOne,numTwo);
        break;
      case `*`:
        multiply(numOne,numTwo);
        break;
      case `/`:
        divide(numOne,numTwo);
        break;
      case `^`:
        exponentiate(numOne,numTwo);
        break;
      case `!`:
        factorial(numOne);
        break;
    }
  }
}