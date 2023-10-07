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
let workingNum = `0`;


function operate(expressionArray) {
    let numOne = +expressionArray[0];
    let operator = expressionArray[1];
    let numTwo = +expressionArray[2];
    switch(operator) {
      case `+`:
        return add(numOne,numTwo);
      case `-`:
        return subtract(numOne,numTwo);
      case `*`:
        return multiply(numOne,numTwo);
      case `/`:
        if(numTwo === 0) {
          alert(`Cannot divide by zero!`)
          return `/0`;
        } else { return divide(numOne,numTwo); }
      case `^`:
        return exponentiate(numOne,numTwo);

      case `!`:
        return factorial(numOne);

      case `%`:
        return percentage(numOne);

      case `MOD`:
        if(numOne === 0 || numTwo === 0) { 
        alert(`Cannot perform modulo with zero`);
        return `0`;
        } else { return modulo(numOne,numTwo); }

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
  if(expressionArray.length === 0) {
    expressionArray.push(workingNum);
    return workingNum;
  } else if(expressionArray.length === 2) {
    expressionArray.push(`0`);
    workingNum = operate(expressionArray);
  }
  if (workingNum === `/0`){ 
    allClear();
    calculatorDisplay.value = `learn2math`;
  } else {
  expressionArray.length = 0;
  expressionArray.push(workingNum);

  calculatorDisplay.value = workingNum;


  calculatorDecimalButton.removeAttribute(`disabled`);
  enableOperators();
  }
  }

let isNum = (buttonValue) =>  {
  if(buttonValue.includes(`.`)) {
    calculatorDecimalButton.setAttribute(`disabled`, ``);
    workingNum += buttonValue;
  } 
  return (/\d/).test(buttonValue);
}

let singleNumExpression = (buttonValue) => {
  console.log(`workingnum: ${workingNum} buttonValue: ${buttonValue}`);
  if(workingNum.includes(`.`) && buttonValue.includes(`!`)) alert(`Cannot perform factorial with decimal number.`);
  else {
    workingNum = operate([workingNum, buttonValue, 0]);
    calculatorDisplay.value = workingNum;
    expressionArray.length = 0;
    expressionArray.push(workingNum);
  }
}


calculatorButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    if(workingNum === undefined || workingNum === null || workingNum === NaN) workingNum=`0`;
    if(expressionArray.includes(undefined)) expressionArray.length = 0;
    console.log(`array: [${expressionArray}], workingNum: ${workingNum}, button ${button.textContent}`);
    workingNum = workingNum.toString();
    if(isNum(button.textContent)) {
      workingNum += button.textContent;
      if(expressionArray.length === 0){
        calculatorDisplay.value = workingNum;
      } else {
        calculatorDisplay.value = expressionArray.join(``) + workingNum;
      }
    }
    if(isAction(button.textContent))              doAction(button.textContent,expressionArray); 
    if(isSingleNumExpression(button.textContent)) singleNumExpression(button.textContent);

    if(isTwoNumExpression(button.textContent))  {
      calculatorDisplay.value += button.textContent;
      if(expressionArray.length === 0){
        expressionArray.push(workingNum, button.textContent);
      } else { 
        expressionArray[0] = workingNum;
        expressionArray.push(button.textContent);
      }
      calculatorDecimalButton.removeAttribute(`disabled`);
      workingNum = ``;
      disableOperators();
    }
  });
});