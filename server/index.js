console.log('test');

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
  let productsList = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      return productsList[i];
    }
  }
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
  productsList.splice(
    productsList.findIndex(function searchById(element, index, array) {
      if (element.id === id) {
        return true;
      }
    })
  );
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
    }
  });
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
    productsList.findIndex(function searchById(element, index, array) {
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

let JSONfileName = path.resolve(__dirname, 'products.json');
console.log(getAllProducts(JSONfileName));
console.log('Вывод продукта по id \n', getProductById(JSONfileName, 1));
addNewProduct(JSONfileName, 'апельсин', 50, 200);
deleteProduct(JSONfileName, 5);
updateProduct(JSONfileName,"малина",200,400,1);
console.log(getAllProducts(JSONfileName));