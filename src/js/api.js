/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */

import 'regenerator-runtime/runtime';
import { countTotal, setResultTotal } from './productsFunctions';
import { getAllProducts, deleteProduct, addProduct, editProduct } from './fetchFunctions';

let resultTotal = 0;

let productsList;
window.onload = function upload() {
  async function updateUI() {
    productsList = await getAllProducts();
    productsList.forEach((element) => {
      element.priceTotal = countTotal(element);
    });

    resultTotal = setResultTotal(productsList);
    const source = document.getElementById('store-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ productsList, resultTotal });
    document.getElementById('result-table').innerHTML = html;

    const buttonAdd = document.querySelector('.button-add');
    const formAdd = document.querySelector('.form--add');
    buttonAdd.addEventListener('click', () => {
      formAdd.style.display = 'block';
    });
    const buttonCloseform = formAdd.querySelector('.form-close');
    buttonCloseform.addEventListener('click', () => {
      formAdd.style.display = 'none';
    });
    window.onclick = function (event) {
      if (event.target === formAdd) {
        formAdd.style.display = 'none';
      }
    };

    const formEdit = document.querySelector('.form--edit');
    formEdit.querySelector('.form-close').addEventListener('click', () => {
      formEdit.style.display = 'none';
    });
    window.onclick = function (event) {
      if (event.target === formEdit) {
        formEdit.style.display = 'none';
      }
    };

    const formAddProduct = document.querySelector('.add-product');
    formAddProduct.onsubmit = async (e) => {
      e.preventDefault();
      const id = productsList.length === 0 ? 1 : productsList[productsList.length - 1].id + 1;
      const product = {
        id,
        product_name: formAddProduct.querySelector('.add-product-name').value,
        product_amount: formAddProduct.querySelector('.add-product-amount').value,
        product_price: formAddProduct.querySelector('.add-product-price').value,
      };

      if (await addProduct(product)) {
        alert('Продукт добавлен');
        formAdd.style.display = 'none';
      } else {
        alert('Продукт не был добавлен');
        formAdd.style.display = 'none';
      }
      updateUI();
    };

    document.querySelectorAll('.button-edit').forEach((element) => {
      element.addEventListener('click', (event) => {
        const id = event.target.id.replace('edit-', '');
        const record = element.parentElement.parentElement;
        const name = record.querySelector('.table-column__input-name').value;
        const price = record.querySelector('.table-column__input-priceForOne').value;
        const amount = record.querySelector('.table-column__input-count').value;
        formEdit.querySelector('.edit-product-name').value = name;
        formEdit.querySelector('.edit-product-price').value = price;
        formEdit.querySelector('.edit-product-amount').value = amount;
        formEdit.querySelector('.edit-product-id').value = id;
        formEdit.style.display = 'block';
      });
    });

    const formEditProduct = document.querySelector('.edit-product');
    formEditProduct.onsubmit = async (e) => {
      e.preventDefault();
      const id = Number(formEditProduct.querySelector('.edit-product-id').value);
      const name = formEditProduct.querySelector('.edit-product-name').value;
      const amount = formEditProduct.querySelector('.edit-product-amount').value;
      const price = formEditProduct.querySelector('.edit-product-price').value;
      const product = {
        id,
        product_name: name,
        product_amount: amount,
        product_price: price,
      };
      if (await editProduct(id, product)) {
        alert('Продукт изменён');
        formEdit.style.display = 'none';
      } else {
        alert('Продукт не был изменён');
        formEdit.style.display = 'none';
      }
      updateUI();
    };
    document.querySelectorAll('.button-delete').forEach((element) => {
      element.addEventListener('click', async (event) => {
        const id = event.target.id.replace('delete-', '');
        if (await deleteProduct(id)) {
          alert('Продукт удалён');
        } else {
          alert('Продукт не был удалён');
        }
        updateUI();
      });
    });
  }
  updateUI();
};
