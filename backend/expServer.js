const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParse.json());
app.use('/api/subject', require('./routes/subject.js'))
app.use('/api/contact', require('./routes/contact.js'))
app.use('/api/subscribe', require('./routes/subscribe.js'))

app.listen(PORT, () => {
    console.log("Servet Running at http://localhost:"+PORT);
})