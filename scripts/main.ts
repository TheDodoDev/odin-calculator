import '../src/style.css'
import { add, subtract, multiply, divide } from './operations.ts';
const NONE: number = -1;
const ADD: number = 0;
const SUB: number = 1;
const MUL: number = 2;
const DIV: number = 3;

let currentNum: string = "";
let previousNum: string = "";
let operand: number = NONE;
type ResultType = number | { error: string };
function operate(num1: number, num2: number, operation: number): ResultType {
    switch (operation) {
        case ADD: return add(num1, num2);
        case SUB: return subtract(num1, num2);
        case MUL: return multiply(num1, num2);
        case DIV: return divide(num1, num2);
        default: return { error: "ERROR" };
    }
}


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="container">
        <div class="previous result">
            <p></p>
        </div>
        <div class="current result">
            <p></p>
        </div>
        <div class="row">
        </div>
    </div>
`

const buttonRow = document.querySelector(".row");
const functions: string[] = ["+/-", "%", "√", "CE", "ON/C"];
const functionButtons: HTMLButtonElement[] = [];
for (let i = 0; i < 5; i++) {
    const button: HTMLButtonElement = document.createElement("button");
    button.innerHTML = functions[i];
    button.classList.add("function");
    functionButtons.push(button);
    buttonRow?.appendChild(button);
}

const container = document.querySelector(".container");
const numbersAndOperations: string[][] = [["1", "2", "3", "+"],
                                          ["4", "5", "6", "-"],
                                          ["7", "8", "9", "x"],
                                          ["0", ".", "=", "÷"]];
const buttons: HTMLButtonElement[][] = [];
for(let i = 0; i < 4; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.classList.add("row");
    buttons.push([]);
    for(let j = 0; j < 4; j++) {
        const button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = numbersAndOperations[i][j];
        button.classList.add("default-btn");
        row.appendChild(button);
        buttons[i][j] = button;
    }
    container?.appendChild(row);
}

let currentResult = document.querySelector(".current.result p");
let previousResult = document.querySelector(".previous.result p");

function appendNumber(e: Event): any {
    if(e.currentTarget && currentNum.length <= 10){
        let target = e.currentTarget as HTMLElement;
        currentNum += target.innerHTML;
    }
    if (currentResult) {
        currentResult.innerHTML = currentNum;
    }
}

function deleteNumber(e: Event): any {
    if(currentResult) {
        currentNum = currentNum.substring(0, currentNum.length - 1);
        currentResult.innerHTML = currentNum;
    }
}

function clearNumber(e: Event): any {
    if(currentResult) {
        currentNum = "";
        currentResult.innerHTML = currentNum;
    }
    if(previousResult) {
        previousNum = "";
        previousResult.innerHTML = previousNum;
    }
}

function setOperand(e: Event): any {
    if(e.currentTarget) {
        let target = e.currentTarget as HTMLButtonElement;
        let op = target.innerHTML;
        if(previousNum == "") {
            if(op == "+") {
                operand = ADD;
            } else if(op == "-") {
                operand = SUB;
            } else if(op == "x") {
                operand = MUL;
            } else if(op == "÷") {
                operand = DIV;
            }
            previousNum = currentNum;
            currentNum = "";
            if(currentResult) {
                currentResult.innerHTML = currentNum;
            }
            if(previousResult) {
                previousResult.innerHTML = previousNum;
            }
        } else {
            let outcome = operate(parseFloat(previousNum), parseFloat(currentNum), operand);
            previousNum = "" + outcome;
            currentNum = "";
            if(currentResult) {
                currentResult.innerHTML = currentNum;
            }
            if(previousResult) {
                previousResult.innerHTML = previousNum;
            }

            if(op == "+") {
                operand = ADD;
            } else if(op == "-") {
                operand = SUB;
            } else if(op == "x") {
                operand = MUL;
            } else if(op == "÷") {
                operand = DIV;
            }
        }
    }
}

function calculate(): void {
    let outcome = operate(parseFloat(previousNum), parseFloat(currentNum), operand);
    operand = NONE;
    previousNum = "";
    currentNum = "" + outcome;
    if(currentResult) {
        currentResult.innerHTML = currentNum;
    }
    if(previousResult) {
        previousResult.innerHTML = previousNum;
    }
}

for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        buttons[i][j].addEventListener("click", appendNumber);
    }
}

for(let i = 0; i < 4; i++) {
    buttons[i][3].addEventListener("click", setOperand);
}
functionButtons[3].addEventListener("click", deleteNumber);
functionButtons[4].addEventListener("click", clearNumber)
buttons[3][2].addEventListener("click", calculate);


