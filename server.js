const express = require('express');

const cors = require('express');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', async (req, res) => {
  try {
    return res.status(200).json('Hello server');
  } catch (err) {
    return console.log(err);
  }
});
