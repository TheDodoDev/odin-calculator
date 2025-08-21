function add(addend1: number, addend2: number): number {
    return addend1 + addend2;
}

function subtract(minuend: number, subtrahend: number): number {
    return minuend - subtrahend;
}

function multiply(multiplicand: number, multiplier: number): number {
    return multiplicand * multiplier;
}

function divide(dividend: number, divisor: number): any {
    if(divisor == 0) {
        alert("Don't Try Mate...");
        return;
    }
    return dividend / divisor;
}

export {
    add,
    subtract,
    multiply,
    divide
};