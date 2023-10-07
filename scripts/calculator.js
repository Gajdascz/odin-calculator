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
const operatorButtons = document.querySelectorAll(`.button-operator`);
const calculatorDisplay = document.querySelector(`input#calculator-display`);
const calculatorDecimalButton = document.querySelector(`.button-decimal`);
const expressionArray = [];
let workingNum = ``;


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
    return result;
}

let disableOperators = () => {
  operatorButtons.forEach((operator) =>{
    operator.setAttribute(`disabled`, ``);
  });
}
let enableOperators = () => {
  operatorButtons.forEach((operator) =>{
    operator.removeAttribute(`disabled`, ``);
  });
}
let allClear = () => {
  calculatorDisplay.value = ``;
  workingNum = ``;
  expressionArray.length = 0;
  calculatorDecimalButton.removeAttribute(`disabled`);
  enableOperators();
}
let removeLast = () => {
  if(calculatorDisplay.value.slice(-1) === `.`) calculatorDecimalButton.removeAttribute(`disabled`);
  calculatorDisplay.value = calculatorDisplay.value.slice(0,-1);
  workingNum = calculatorDisplay.value;
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
let isSingleNumExpression = (buttonValue) => {
  switch(buttonValue) {
    case `!`:
      return buttonValue;
    case `%`:
      return buttonValue;
  }
  return false;
}


let doAction = (action,expressionArray=[]) => {
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
  } else { calculatorDisplay.value = workingNum; }
}

let isNum = (buttonValue) =>  {
  return (/\d|\./).test(buttonValue);
}

let singleNumExpression = (buttonValue) => {
  if(workingNum.includes(`.`) && buttonValue.includes(`!`)) alert(`Cannot perform factorial with decimal number.`);
  if(+workingNum < 0 && buttonValue.includes(`!`)) alert(`Cannot perform factorial with negative number.`);
  else {
    if(buttonValue.includes(`%`)) calculatorDecimalButton.setAttribute(`disabled`, ``);
    if(buttonValue.includes(`%`) && workingNum === `0` || workingNum === ``) return;
    workingNum = operate([workingNum, buttonValue, 0]);
    calculatorDisplay.value = workingNum;
    expressionArray.length = 0;
    expressionArray.push(workingNum);
  }
}

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
}


calculatorButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    if(isNum(button.textContent)) updateWorkingNum(button.textContent);
    if(isAction(button.textContent)) doAction(button.textContent,expressionArray); 
    if(isSingleNumExpression(button.textContent)) singleNumExpression(button.textContent);
    if(isTwoNumExpression(button.textContent)) doubleNumExpression(button.textContent);
  });
});