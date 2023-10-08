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

// Selects important DOM elements for UI interaction.
const calculatorButtons = document.querySelectorAll(`.calculator-buttons-container > * > button`);
const operatorButtons = document.querySelectorAll(`.button-operator`);
const calculatorDisplay = document.querySelector(`input#calculator-display`);
const calculatorDecimalButton = document.querySelector(`.button-decimal`);

// Used to map keyboard input to related calculator buttons.
const keyToButton = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '.': '.',
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '^': '^',
  '!': '!',
  '%': '%',
  'm': 'm',
  'Enter': '=',
  'Escape': 'AC',
  'Backspace': '⬅',
};

// Stores the expression as number, operator, number for calculation.
const expressionArray = [];

// The working and frequently updated number used in calculations.
let workingNum = ``;

// The highest number the calculator can perform a factorial operation on without returning Infinity.
const MAXFACTORIAL = 153;


// Performs operation on the expression stored in an array.
function operate(expressionArray) {
    let result = ``;
    let numOne = +expressionArray[0];
    let operator = expressionArray[1];
    let numTwo = +expressionArray[2];
    switch(operator) {
      case `+`:
        result = add(numOne,numTwo).toString();
        break;
      case `-`:
        result = subtract(numOne,numTwo).toString();
        break;
      case `*`:
        result = multiply(numOne,numTwo).toString(); 
        break; 
      case `/`:
        if(numTwo === 0) {
          alert(`Cannot divide by zero!`);
          result = `/0`;
          break;
        } else { 
            result = divide(numOne,numTwo).toString();
            break;
        }
      case `^`:
        result = exponentiate(numOne,numTwo).toString(); 
        break;
      case `!`:
        result = factorial(numOne).toString();
        break;
      case `%`:
        result = percentage(numOne).toString();
        break;
      case `MOD`:
        if(numOne === 0 || numTwo === 0) { 
          alert(`Cannot perform modulo with zero`);
          result = `0`;
        } else { 
            result = modulo(numOne,numTwo).toString();
            break;
        }
    }
    if(result === Infinity){
      alert(`You've hit Infinity! Resetting Calculator`);
      result = ``;
      allClear();
    }
    if(result.length > 47) {
      alert(`Result: ${result} is too large for the calculator display! Resetting Calculator.`);
      result = ``;
      allClear();
    }
    if(result.includes(`.`)) {
      result = Math.round(+result*(10**20))/(10**20);
      result = result.toString();
    }
    checkDisplay();
    return result;
}

// Disable the calculator's operator buttons.
let disableOperators = () => {
  operatorButtons.forEach((operator) =>{
    operator.setAttribute(`disabled`, ``);
  });
}

// Enable the calculator's operator buttons. 
let enableOperators = () => {
  operatorButtons.forEach((operator) =>{
    operator.removeAttribute(`disabled`, ``);
  });
}

// Clears the calculator's memory.
let allClear = () => {
  calculatorDisplay.value = ``;
  workingNum = ``;
  expressionArray.length = 0;
  calculatorDecimalButton.removeAttribute(`disabled`);
  enableOperators();
  checkDisplay();
}

// Removes the last input and updates the working number.
let removeLast = () => {
  if(calculatorDisplay.value.slice(-1) === `.`) calculatorDecimalButton.removeAttribute(`disabled`);
  calculatorDisplay.value = calculatorDisplay.value.slice(0,-1);
  workingNum = calculatorDisplay.value;
  checkDisplay();
}


// Checks if the input is an action.
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


// Checks if the operation should work on two numbers.
let isTwoNumExpression = (buttonValue) => {
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
    case `MOD`:
      return buttonValue;
  }
  return false;
}

// Checks if the operation should only work on one number.
let isSingleNumExpression = (buttonValue) => {
  switch(buttonValue) {
    case `!`:
      return buttonValue;
    case `%`:
      return buttonValue;
  }
  return false;
}

// Does relevant action based on user input.
let doAction = (action) => {
  switch(action) {
    case `AC`:
      allClear();
      break;
    case `⬅`:
      removeLast();
      break;
    case `=`:
      equate();
      break;
    }
}

// Performs calculation and updates the expression array.
let equate = () => {
  if(expressionArray.length === 0 || expressionArray.length === 1) {
    expressionArray[0] = workingNum;
  }
  else if(expressionArray.length === 2) { 
    expressionArray[2] = workingNum; 
  }
  if(expressionArray.length === 3) {  
    workingNum = operate(expressionArray);
    calculatorDecimalButton.removeAttribute(`disabled`);
    expressionArray.length = 0;
    enableOperators();
  } 
  if(workingNum === `/0`) { 
    allClear();
    calculatorDisplay.value = `learn2math`;
  } else { 
    calculatorDisplay.value = workingNum;
  }
}

// Checks if the input is a number or decimal.
let isNum = (buttonValue) =>  {
  return (/\d|\./).test(buttonValue);
}

// Performs single number operations and ensures valid input.
let singleNumExpression = (buttonValue) => {
  if(workingNum.includes(`.`) && buttonValue.includes(`!`)) alert(`Cannot perform factorial with decimal number.`);
  if(+workingNum < 0 && buttonValue.includes(`!`)) alert(`Cannot perform factorial with negative number.`);
  if(+workingNum >= MAXFACTORIAL && buttonValue.includes(`!`)) {
    alert(`Factorials over ${MAXFACTORIAL} result in Infinity. Stopping calculation.`);
    return;
  }
  else {
    if(buttonValue.includes(`%`)) calculatorDecimalButton.setAttribute(`disabled`, ``);
    if(buttonValue.includes(`%`) && workingNum === `0` || workingNum === ``) return;
    workingNum = operate([workingNum, buttonValue, 0]);
    calculatorDisplay.value = workingNum;
    expressionArray.length = 0;
    expressionArray.push(workingNum);
    checkDisplay();
  }
}

// Sets up calculator to perform double number expressions.
let doubleNumExpression = (buttonValue) => {
  calculatorDisplay.value += buttonValue;
  if(expressionArray.length === 0){
    expressionArray.push(workingNum, buttonValue);
  } else { 
    expressionArray[0] = workingNum;
    expressionArray[1] = buttonValue;
  }
  calculatorDecimalButton.removeAttribute(`disabled`);
  workingNum = ``;
  disableOperators();
}

// Updates the working number and calculator display.
let updateWorkingNum = (buttonValue) => {
  if(buttonValue.includes(`.`)) {
    calculatorDecimalButton.setAttribute(`disabled`, ``);
    workingNum += buttonValue;
  } else {
    workingNum += buttonValue;
  } 
  if(expressionArray.length === 0 || expressionArray.length === 1) {
    calculatorDisplay.value = workingNum;
  } else {
    calculatorDisplay.value = expressionArray.join(``) + workingNum;
  }
  checkDisplay();
}

// Ensures calculator display does not overflow and dynamically changes font-size
let checkDisplay = () => {
  if(calculatorDisplay.value.length < 11) {
    calculatorDisplay.setAttribute(`style`, `font-size: 40px;`);
  }
  else if(calculatorDisplay.value.length > 11 && calculatorDisplay.value.length < 18) {
    calculatorDisplay.setAttribute(`style`, `font-size: 25px;`);
  }
  else if(calculatorDisplay.value.length < 18 && calculatorDisplay.value.length > 11) {
    calculatorDisplay.setAttribute(`style`, `font-size: 25px;`);
  }
  else if(calculatorDisplay.value.length > 18 && calculatorDisplay.value.length < 31) {
    calculatorDisplay.setAttribute(`style`, `font-size: 15px;`);
  }
  else if(calculatorDisplay.value.length < 31 && calculatorDisplay.value.length > 18) {
    calculatorDisplay.setAttribute(`style`, `font-size: 25px;`);
  }
  else if(calculatorDisplay.value.length > 31 && calculatorDisplay.value.length <= 47) {
    calculatorDisplay.setAttribute(`style`, `font-size: 10px;`);
  } else if(calculatorDisplay.value.length == 48) {
    alert(`This calculator can only display 47 characters.`)
    removeLast();
  }
}


// Responds to keyboard input from user by pressing relevant button on calculator
document.addEventListener(`keyup`, (event) => {
  const key = event.key;
  if(Object.hasOwn(keyToButton, key)) {
    const button = document.querySelector(`button[value='${key}']`);
    if(button) button.click();
  };
});


// Takes user input from UI and calls relevant function(s)
calculatorButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    if(isNum(button.textContent)) updateWorkingNum(button.textContent);
    if(isAction(button.textContent)) doAction(button.textContent); 
    if(isSingleNumExpression(button.textContent)) singleNumExpression(button.textContent);
    if(isTwoNumExpression(button.textContent)) doubleNumExpression(button.textContent);
  });
});