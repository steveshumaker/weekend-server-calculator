// create express object
const express = require('express');
// import the calculations array
let calcArray = require('./modules/calcs.js');
// init port
const PORT = 8000;
// init app
const app = express();

// serve static files 
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
    
    // math logic to package the object to send back
    if (dataFromClient.operation === '') { // need to figure out how to handle this
        num1 = 0;
        num2 = 0;
        dataFromClient.eval = num1 * num2;
    } else if (dataFromClient.operation === 'add') {
        dataFromClient.eval = num1 + num2;
        dataFromClient.sign = '+';
    } else if (dataFromClient.operation === 'subtract') {
        dataFromClient.eval = num1 - num2;
        dataFromClient.sign = '-';
    } else if (dataFromClient.operation === 'multiply') {
        dataFromClient.eval = num1 * num2;
        dataFromClient.sign = '*';
    } else {
        dataFromClient.eval = num1 / num2;
        dataFromClient.sign = '/';
    }

    calcArray.push(dataFromClient);
    res.sendStatus(201);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
