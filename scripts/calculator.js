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


const calculatorButtons = document.querySelectorAll(`.calculator-buttons-container > * > button`);
const calculatorDisplay = document.querySelector(`input#calculator-display`);
let expressionArray = [];
let workingNum = ``;


function operate(expressionArray) {
    let result = 0;
    let numOne = expressionArray[0];
    let numTwo = expressionArray[1];
    let operator = expressionArray[2];
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


let isNum = (buttonValue) =>  (/\d/).test(buttonValue);
let isOperator = (buttonValue) => {
  switch(buttonValue) {
    case `+`:
      return buttonValue;
    case `-`:
      return buttonValue;
    case `*`:
      return buttonValue;
    case `/`:
      return buttonValue;
    case `^`:
      return buttonValue;
    case `!`:
      return buttonValue;
    case `%`:
      return buttonValue;
    case `MOD`:
      return buttonValue;
  }
  return false;
}
let isAction = (buttonValue) => {
  switch(buttonValue) {
    case `AC`:
      return buttonValue;
    case `⬅`:
      return buttonValue;
    case `=`:
      return buttonValue;
  }
}


let doAction = (action) => {
  switch(action) {
    case `AC`:
      allClear();
      break;
    case `⬅`:
      removeLast();
    case `=`:
      return action;
  }
}

let allClear = () => {
  calculatorDisplay.value = ``;
  workingNum.textContent = ``;
  expressionArray = [];
}
let removeLast = () => calculatorDisplay.value = calculatorDisplay.value.slice(0,-1);



function display(buttonValue) {

  calculatorDisplay.value += buttonValue;
}



calculatorButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    if(isNum(button.textContent)) {
       workingNum += button.textContent;
       display(button.textContent); 
      }
    if(isAction(button.textContent))  { 
      doAction(button.textContent); 
    }
    if(isOperator(button.textContent))  {
      if(button.textContent === `!` || button.textContent ===`%` && workingNum !== ``) { workingNum = operate(workingNum,0,button.textContent); }
      console.log(workingNum);
      if(expressionArray.length < 2)
        expressionArray.push(workingNum);
        workingNum = ``;
    }
  });
});

// added calculator button selector and eventListeners, disabled paren buttons, added display function,
// added expression array 