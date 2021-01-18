const fs = require('fs');
const path = require('path');

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
  return productsList[
    productsList.findIndex((element, index, array) => {
      if (element.id === id) {
        return true;
      }
    })
  ];
}

function addNewProduct(fileJSON, newProductName, newProductPrice, newProductAmount) {
  const productsList = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
  const lastId = productsList[productsList.length - 1].id;
  productsList.push({
    id: lastId + 1,
    product_name: newProductName,
    product_price: newProductPrice,
    product_amount: newProductAmount,
  });
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
    }
  });
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
  if (deleteIndex !== (-1)){
    productsList.splice(deleteIndex, 1);
    fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
      if (err) {
        console.error(err);
      }
    });
    return true;
  }
}

function updateProduct(fileJSON, newProductName, newProductPrice, newProductAmount, newId) {
  let newProduct = {
    id: newId,
    product_name: newProductName,
    product_price: newProductPrice,
    product_amount: newProductAmount,
  };
  const productsList = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
  productsList[
    productsList.findIndex((element, index, array) => {
      if (element.id === newId) {
        return true;
      }
    })
  ] = newProduct;
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const JSONfileName = path.resolve(__dirname, 'products.json');

console.log(getAllProducts(JSONfileName));
console.log('Вывод продукта по id \n', getProductById(JSONfileName, 2));
addNewProduct(JSONfileName, 'арбуз', 50, 200);
deleteProduct(JSONfileName, 2);
updateProduct(JSONfileName, 'малина', 430, 400, 1);
console.log(getAllProducts(JSONfileName));