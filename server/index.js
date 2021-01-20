const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

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

app.listen(80, (err) => {
  if (err) return console.log('something bad happened', err);
  console.log('server is listening 80');
});

const addProduct = { id: 5, product_name: 'арбуз', product_price: 50, product_amount: 200 };

function getAllProducts(fileJSON) {
  return JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
}

function getProductById(fileJSON, id) {
  const productsList = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
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
  const productsList = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
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
  const productsList = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
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
}

function updateProduct(fileJSON, id, newProduct) {
  const productsList = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return { error: 'failed update' };
      }
    })
  );
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

const JSONfileName = path.resolve(__dirname, 'products.json');

// console.log(getAllProducts(JSONfileName));
//console.log('Вывод продукта по id \n', getProductById(JSONfileName, 2));
//addNewProduct(JSONfileName,addProduct);
// deleteProduct(JSONfileName, 2);
// updateProduct(JSONfileName, 'малина', 430, 400, 1);
// console.log(getAllProducts(JSONfileName));