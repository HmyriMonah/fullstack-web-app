/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

module.exports.getAllProducts= function getAllProducts(fileJSON) {
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

module.exports.getProductById = function getProductById(fileJSON, id) {
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

module.exports.addNewProduct = function addNewProduct(fileJSON, newProduct) {
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
      return { error: 'failed add' };
    }
  });
  return { result: 'ok' };
}

module.exports.deleteProduct = function deleteProduct(fileJSON, id) {
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

module.exports.updateProduct = function updateProduct(fileJSON, id, newProduct) {
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