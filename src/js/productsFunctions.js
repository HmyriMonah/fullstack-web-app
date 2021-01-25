/* eslint-disable no-restricted-globals */
/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */

export function countTotal(product) {
  if (product === null || typeof product === 'boolean' || typeof product !== 'object') {
    return false;
  }
  return product.product_amount * product.product_price;
}

export function setResultTotal(list) {
  if (typeof list !== 'object' || list === null) {
    return false;
  }
  return list
    .map((item) => item.priceTotal)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
}
