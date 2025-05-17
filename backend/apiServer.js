const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/register', registerRoute); // <<< สำคัญ
app.use('/api/login', loginRoute);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

process.on('exit', (code) => {
    console.log(`⚠️ Process exited with code ${code}`);
  });

app.get('/', (req, res) => {
 res.send("Hello from backend");
});