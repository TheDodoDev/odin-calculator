import '../src/style.css'
import { add, subtract, multiply, divide } from './operations.ts';
const ADD: number = 0;
const SUB: number = 1;
const MUL: number = 2;
const DIV: number = 3;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="container">
        <div class="previous result">
            <p>4</p>
        </div>
        <div class="current result">
            <p>5</p>
        </div>
        <div class="row">
        </div>
    </div>
`

const buttonRow = document.querySelector(".row");
const functions: string[] = ["+/-", "%", "√", "CE", "ON/C"];

for (let i = 0; i < 5; i++) {
    const button: HTMLButtonElement = document.createElement("button");
    button.innerHTML = functions[i];
    button.classList.add("function");
    buttonRow?.appendChild(button);
}

const container = document.querySelector(".container");
const numbersAndOperations: string[][] = [["1", "2", "3", "+"],
                                          ["4", "5", "6", "-"],
                                          ["7", "8", "9", "x"],
                                          ["0", ".", "=", "÷"]];

for(let i = 0; i < 4; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.classList.add("row");
    for(let j = 0; j < 4; j++) {
        const button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = numbersAndOperations[i][j];
        button.classList.add("default-btn");
        row.appendChild(button);
    }
    container?.appendChild(row);
}
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