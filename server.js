const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3000;

const whiteList = ['http://localhost:8080'];

function cors (req, res, next) {
  const origin = req.get('origin');
  if (origin && whiteList.includes(origin)) {
    res.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': '*',
    });
  }
  next();
}

app.use(cors);
app.post('/upload', upload.single('file'), function (req, res, next) {
  res.send({ message: 'ok', data: req.file });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
