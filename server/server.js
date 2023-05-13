const express = require('express');
const PORT = 8000;

let app = express();
app.use(express.static('server/public/'));


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
