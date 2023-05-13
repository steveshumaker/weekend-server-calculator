// imports and declarations
let operation = '';

// calculator function
function doMath(event) {
    console.log('in doMath');
    event.preventDefault();

    let num1 = Number(document.getElementById('num1').value);
    let num2 = Number(document.getElementById('num2').value);

    if (operation === 'add') {
        console.log(num1 + num2);
    } else if (operation === 'subtract') {
        console.log(num1 - num2);
    } else if (operation === 'multiply') {
        console.log(num1 * num2);
    } else {
        console.log(num1 / num2);
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