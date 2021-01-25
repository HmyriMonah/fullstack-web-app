/* eslint-disable comma-dangle */
/* eslint-disable no-undef */

const productsFunctions = require('./productsFunctions');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const jsonFileName = path.resolve(__dirname, 'products.json');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.get('/products', (req, res) => {
  res.json(productsFunctions.getAllProducts(jsonFileName));
});

app.get('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    const result = productsFunctions.getProductById(jsonFileName, id, req.body);
    res.send(result);
  } else res.status(444).send({ error: 'wrong id' });
});

app.post('/product', (req, res) => {
  const result = productsFunctions.addNewProduct(jsonFileName, req.body);
  res.send(result);
});

app.put('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    const result = productsFunctions.updateProduct(jsonFileName, id, req.body);
    res.send(result);
  } else res.status(404).send({ error: 'wrong id' });
});

app.delete('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    const result = productsFunctions.deleteProduct(jsonFileName, id, req.body);
    res.send(result);
  } else res.status(404).send({ error: 'wrong id' });
});

app.listen(80, (err) => {
  if (err) return console.log('something bad', err);
  console.log('server is listening 80');
});
