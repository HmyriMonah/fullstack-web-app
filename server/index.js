const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const JSONfileName = path.resolve(__dirname, 'products.json');

app.use(express.json());

app.get('/products', (req, res) => {
  res.json(getAllProducts(JSONfileName));
});

app.get('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  res.json(getProductById(JSONfileName, id));
});

app.post('/product', (req, res) => {
  let result = addNewProduct(JSONfileName, req.body);
  res.send(result);
});

app.put('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  let result = updateProduct(JSONfileName, id, req.body);
  res.send(result);
});

app.delete('/product/:id', (req, res) => {
  const id = Number(req.params.id);
  let result = deleteProduct(JSONfileName, id);
  res.send(result);
});

app.listen(80, (err) => {
  if (err) return console.log('something bad happened', err);
  console.log('server is listening 80');
});

function getAllProducts(fileJSON) {
  try {
    return JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return false;
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function getProductById(fileJSON, id) {
  let productsList;
  try {
     productsList = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
  if (
    productsList.findIndex((element, index, array) => {
      if (element.id === id) {
        return true;
      }
    }) !== -1
  ) {
    return productsList[
      productsList.findIndex((element, index, array) => {
        if (element.id === id) {
          return true;
        }
      })
    ];
  } else return { error: 'wrong id' };
}

function addNewProduct(fileJSON, newProduct) {
  let productsList;
  try {
     productsList = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
  productsList.push(newProduct);
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return { error: 'failed delete' };
    }
  });
  return { result: 'ok' };
}

function deleteProduct(fileJSON, id) {
  let productsList;
  try {
     productsList = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
  let deleteIndex = productsList.findIndex((element, index, array) => {
    if (element.id === id) {
      return true;
    }
  });
  if (deleteIndex !== -1) {
    productsList.splice(deleteIndex, 1);
    fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
      if (err) {
        console.error(err);
        return { error: 'failed delete' };
      }
    });
    return { result: 'ok' };
  }
  return { error: 'failed delete' };
}

function updateProduct(fileJSON, id, newProduct) {
  let productsList;
  try {
     productsList = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
  let productindex = productsList.findIndex((element, index, array) => {
    if (element.id === id) {
      return true;
    }
  });
  if (productindex !== -1) {
    productsList[productindex] = newProduct;
    fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
      if (err) {
        console.error(err);
        return { error: 'failed update' };
      }
    });
    return { result: 'ok' };
  } else {
    return { error: 'failed update' };
  }
  productsList[productindex] = newProduct;
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return { error: 'failed update' };
    }
  });
  return { result: 'ok' };
}

