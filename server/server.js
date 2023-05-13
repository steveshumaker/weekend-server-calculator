const express = require('express');
let calcArray = require('./modules/calcs.js');
const PORT = 8000;

const app = express();
app.use(express.static('server/public/'));

app.post('/calcs', (req, res) => {
    calcArray.push(req.body);
    res.sendStatus(201);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
