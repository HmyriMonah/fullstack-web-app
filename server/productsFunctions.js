/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars*/
const fs = require('fs');
module.exports.getAllProducts = function getAllProducts(fileJSON) {
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
    console.error({ error: 'Caanot read file' });
  }
};

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
    console.error({ error: 'Caanot read file' });
  }
  const prodcutIndex = productsList.findIndex((element, index, array) => {
    if (element.id === id) {
      return true;
    }
  });
  if (prodcutIndex !== -1) {
    return productsList[prodcutIndex];
  } else return { error: 'wrong id' };
};

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
    console.error({ error: 'Caanot read file' });
  }
  productsList.push(newProduct);
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return { error: 'failed add' };
    }
  });
  return { result: 'ok' };
};

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
    console.error({ error: 'Caanot read file' });
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
};

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
    console.error({ error: 'Caanot read file' });
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
};
