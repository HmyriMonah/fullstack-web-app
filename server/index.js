/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const JSONfileName = path.resolve(__dirname, 'products.json');

const script = require('./productsFunctions');

app.use(express.json());

app.get('/products', (req, res) => {
  res.json(script.getAllProducts(JSONfileName));
});

app.get('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  res.json(script.getProductById(JSONfileName, id));
});

app.post('/product', (req, res) => {
  let result = script.addNewProduct(JSONfileName, req.body);
  res.send(result);
});

app.put('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  let result = script.updateProduct(JSONfileName, id, req.body);
  res.send(result);
});

app.delete('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  let result = script.deleteProduct(JSONfileName, id);
  res.send(result);
});

app.listen(80, (err) => {
  if (err) return console.log('something bad happened', err);
  console.log('server is listening 80');
});


