const express = require('express');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/payload', (req, res) => {
  // res.send('Hello World!');
  res.send(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));