/* ### Onclicks ### */

// imports and declarations
let operation = '';
let sign = '';
let eval = '';



// calculator function / POST
function doMath(event) {
    console.log('in doMath', operation);
    event.preventDefault();

    let num1 = Number(document.getElementById('num1').value);
    let num2 = Number(document.getElementById('num2').value);


    let calcToAdd = JSON.stringify({
        num1: num1,
        operation: operation,
        num2: num2,
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
        let outputEl = document.getElementById('output');

        outputEl.innerHTML = `<h2>${calcs[calcs.length-1].eval}</h2>`;

        for (let calc of calcs) {
            calcDiv.innerHTML += `<p>${calc.num1} ${calc.sign} ${calc.num2} = ${calc.eval}</p>`;
        }
    }).catch((error) => {
        console.log(error);
        alert('Error!');
    });
}