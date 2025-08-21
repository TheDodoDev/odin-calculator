import '../src/style.css'
import { add, subtract, multiply, divide } from './operations.ts';
const ERROR: number = -1;
const ADD: number = 0;
const SUB: number = 1;
const MUL: number = 2;
const DIV: number = 3;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

`

function operate(num1: number, num2: number, operation: number): number {
    switch (operation) {
        case ADD: return add(num1, num2);
        case SUB: return subtract(num1, num2);
        case MUL: return multiply(num1, num2);
        case DIV: return divide(num1, num2);
        default: return ERROR;
    }
}