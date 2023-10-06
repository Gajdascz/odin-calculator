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
    let result = 0;
    let numOne = +expressionArray[0];
    let operator = expressionArray[1];
    let numTwo = +expressionArray[2];
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


let isNum = (buttonValue) =>  {
  return (/\d/).test(buttonValue);
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


let doAction = (action,expressionArray=[]) => {
  switch(action) {
    case `AC`:
      allClear();
      break;
    case `⬅`:
      removeLast();
      break;
    case `=`:
      expressionArray.push(workingNum);
      workingNum = operate(expressionArray);
      expressionArray.length = 0;
      expressionArray.push(workingNum);
      enableOperators();
      calculatorDisplay.value = workingNum;
      console.log(expressionArray);
  }
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
  enableOperators();
}
let removeLast = () => {
  calculatorDisplay.value = calculatorDisplay.value.slice(0,-1);
  workingNum = calculatorDisplay.value;
}






calculatorButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    if(isNum(button.textContent)) {
       workingNum += button.textContent; 
       calculatorDisplay.value += button.textContent;
    }
    if(isAction(button.textContent)) doAction(button.textContent,expressionArray); 
    if(isSingleNumExpression(button.textContent)) {
      workingNum = operate([workingNum, button.textContent, 0]);
      calculatorDisplay.value = workingNum;
      expressionArray.length = 0;
      expressionArray.push(workingNum);
    }
    if(isTwoNumExpression(button.textContent))  {
      calculatorDisplay.value += button.textContent;
     if(expressionArray.length === 0){
        expressionArray.push(workingNum, button.textContent);
      } else { 
        expressionArray[0] = workingNum;
        expressionArray.push(button.textContent)
      }
      workingNum = ``;
      disableOperators();
    }
    console.log(`array: [${expressionArray}], workingNum: ${workingNum}`);
  });
});