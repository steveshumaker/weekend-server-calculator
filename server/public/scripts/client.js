/* ### Onclicks ### */

// imports and declarations
let operation = '';
let sign = '';
let calcFromClient = []; // empty array to hold # from event listener
let x = calcFromClient.length; // global to loop over calcs object
let evalArray = ['*', '/', '+', '-'];

getCalcs();

// 'equal' onclick - add a calculation / POST
function doMath(event) {
    event.preventDefault();
    console.log('evaluating, calc array is: ', calcFromClient); // testing the event listeners

    if (event.target.id === 'clear') {
        document.querySelector('#output').innerHTML = '';
        return;
    }

    // get the values from the user
    // let num1 = Number(calcFromClient[0]);
    // let num2 = Number(calcFromClient[2]);

    // add the values to an object to send to the server
    let calcToAdd = JSON.stringify({
        num1: num1,
        operation: operation,
        num2: num2,
    });


    // send the object to the server
    fetch('/calcs', {method: 'POST', body: calcToAdd, headers: { 'Content-Type': 'application/json' }})
    // once a response is received, clear the history and call the getCalcs function
    .then((response) => {
        document.querySelector('#memoryDiv').innerHTML = '';
        getCalcs();
        return calcFromClient = [];
    })
    // catch errors
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
// function clearFields() {
//     // document.getElementById('num1').value = '';
//     // document.getElementById('num2').value = '';
//     return operation = '';
// }

/* ### GETs ### */

function getCalcs() {
    fetch('/calcs')
    .then((response) => {
        // convert the response object to json
        return response.json();
    })
    .then((calcs) => {
        // iterate over the returned json to update the history
        let calcDiv = document.getElementById('memoryDiv');
        let outputEl = document.getElementById('output');

        // update the current calculation result with the result of the last calculation posted
        outputEl.innerHTML = `<h2>${calcs[calcs.length-1].eval}</h2>`;

        // update the history for each calculation by the user
        // console.log(calcs);
        for (let i = 1; i < calcs.length; i++) {
            calcDiv.innerHTML += `<p>${calcs[i].num1} ${calcs[i].sign} ${calcs[i].num2} = ${calcs[i].eval}</p>`;
        }

    }).catch((error) => {
        console.log('getCalcs error:', error);
        alert('Error!');
    });
}

// event listener for buttons
const buttons = document.querySelectorAll('.numberButton');

buttons.forEach(button => {
    button.addEventListener('click', event => {
        if (event.target.id === 'clear') {
            return;
        } else {
            calcFromClient.push(event.target.id);
        }
    });
});

