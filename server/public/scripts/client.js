/* ### Onclicks ### */

// imports and declarations
let operation = '';
let sign = '';
let eval = '';



// calculator function / POST
function doMath(event) {
    // let eval = '';
    let outputEl = document.getElementById('output');
    console.log('in doMath', operation);
    event.preventDefault();

    let num1 = Number(document.getElementById('num1').value);
    let num2 = Number(document.getElementById('num2').value);

    // logic to handle different states of operations
    if (operation === '') { // need to figure out how to handle this
        num1 = 0;
        num2 = 0;
        eval = num1 * num2;
        console.log(num1 * num2);
    } else if (operation === 'add') {
        eval = num1 + num2;
        console.log(num1 + num2);
        sign = '+';
    } else if (operation === 'subtract') {
        eval = num1 - num2;
        console.log(num1 - num2);
        sign = '-';
    } else if (operation === 'multiply') {
        eval = num1 * num2;
        console.log(num1 * num2);
        sign = '*';
    } else {
        eval = num1 / num2;
        console.log(num1 / num2);
        sign = '/';
    }

    outputEl.innerHTML = `<h2>${String(eval)}</h2>`;

    let calcToAdd = JSON.stringify({
        num1: num1,
        operation: sign,
        num2: num2,
        result: eval
    });

    fetch('/calcs', {method: 'POST', body: calcToAdd, headers: { 'Content-Type': 'application/json' }})
    .then((response) => {
        document.querySelector('#memoryDiv').innerHTML = '';
        getCalcs();
    })
    .catch((error) => {
        console.log('Error: ', error);
        alert('Error!');
    });

    
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

/* ### GETs ### */

function getCalcs() {
    fetch('/calcs')
    .then((response) => {
        return response.json();
    })
    .then((calcs) => {
        let calcDiv = document.getElementById('memoryDiv');

        for (let calc of calcs) {
            calcDiv.innerHTML += `<p>${calc.num1} ${calc.operation} ${calc.num2} = ${calc.result}</p>`;
        }
    }).catch((error) => {
        alert('Error!');
    });
}