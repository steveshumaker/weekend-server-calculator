// imports and declarations
let operation = '';

// calculator function
function doMath(event) {
    console.log('in doMath');
    event.preventDefault();

    let num1 = Number(document.getElementById('num1').value);
    let num2 = Number(document.getElementById('num2').value);

    // logic to handle different states of operations
    if (operation === '') {
        num1 = 0;
        num2 = 0;
        console.log(num1 * num2);
        return num1 * num2;
    } else if (operation === 'add') {
        console.log(num1 + num2);
        return num1 + num2;
    } else if (operation === 'subtract') {
        console.log(num1 - num2);
        return num1 - num2;
    } else if (operation === 'multiply') {
        console.log(num1 * num2);
        return num1 * num2;
    } else {
        console.log(num1 / num2);
        return num1 / num2;
    }
}

// math operation functions
function passPlus() {
    return operation =  'add';
}

function passMinus() {
    return operation = 'subtract';
}

function passMultiply() {
    return operation = 'multiply';
}

function passDivide() {
    return operation = 'divide';
}

// function to handle the clear button
function clearFields() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    return operation = '';
}