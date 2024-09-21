class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ProductCard {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
    this.element = document.createElement('div');
    this.element.className = 'card-body';
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <p>${this.product.name}</p>
      <p>Unit Price: ${this.product.price} $</p>
      <p>Quantity: <span class="quantity">${this.quantity}</span></p>
      <button class="fa-plus-circle">+</button>
      <button class="fa-minus-circle">-</button>
      <button class="fa-trash-alt">Delete</button>
      <button class="fa-heart far">Like</button>
    `;
    this.element.querySelector('.fa-plus-circle').addEventListener('click', () => {
      this.quantity++;
      this.updateQuantity();
      updateTotalPrice();
    });
    this.element.querySelector('.fa-minus-circle').addEventListener('click', () => {
      if (this.quantity > 0) {
        this.quantity--;
        this.updateQuantity();
        updateTotalPrice();
      }
    });
    this.element.querySelector('.fa-trash-alt').addEventListener('click', () => {
      this.element.remove();
      updateTotalPrice();
    });
    this.element.querySelector('.fa-heart').addEventListener('click', () => {
      this.element.querySelector('.fa-heart').classList.toggle('fas');
      this.element.querySelector('.fa-heart').classList.toggle('far');
    });
  }

  updateQuantity() {
    this.element.querySelector('.quantity').textContent = this.quantity;
  }
}


class ShoppingCart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  updateTotalPrice() {
    let totalPrice = 0;
    this.products.forEach((product) => {
      totalPrice += product.product.price * product.quantity;
    });
    document.querySelector('.total').textContent = `${totalPrice.toFixed(2)} $`;
  }
}

const cart = new ShoppingCart();

const product1 = new Product(1, "Apple iPhone", 999.99);
const product2 = new Product(2, "Samsung TV", 1299.99);
const product3 = new Product(3, "Nike Shoes", 79.99);

const card1 = new ProductCard(product1, 0);
const card2 = new ProductCard(product2, 0);
const card3 = new ProductCard(product3, 0);

cart.addProduct(card1);
cart.addProduct(card2);
cart.addProduct(card3);

document.body.appendChild(card1.element);
document.body.appendChild(card2.element);
document.body.appendChild(card3.element);

cart.updateTotalPrice();