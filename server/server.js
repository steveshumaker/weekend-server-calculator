const express = require('express');
let calcArray = require('./modules/calcs.js');
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.static('server/public/'));

// GET calcs
app.get('/calcs', (req, res) => {
    res.send(calcArray);
})

// POST new calc
app.post('/calcs', (req, res) => {
    let dataFromClient = req.body;
    let num1 = dataFromClient.num1;
    let num2 = dataFromClient.num2;
    
    if (dataFromClient.operation === '') { // need to figure out how to handle this
        num1 = 0;
        num2 = 0;
        dataFromClient.eval = num1 * num2;
        console.log(num1 * num2);
    } else if (dataFromClient.operation === 'add') {
        dataFromClient.eval = num1 + num2;
        console.log(num1 + num2);
        dataFromClient.sign = '+';
    } else if (dataFromClient.operation === 'subtract') {
        dataFromClient.eval = num1 - num2;
        console.log(num1 - num2);
        dataFromClient.sign = '-';
    } else if (dataFromClient.operation === 'multiply') {
        dataFromClient.eval = num1 * num2;
        console.log(num1 * num2);
        dataFromClient.sign = '*';
    } else {
        dataFromClient.eval = num1 / num2;
        console.log(num1 / num2);
        dataFromClient.sign = '/';
    }

    // outputEl.innerHTML = `<h2>${String(dataFromClient.eval)}</h2>`;


    calcArray.push(dataFromClient);
    res.sendStatus(201);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
