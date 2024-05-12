document.addEventListener("DOMContentLoaded", function() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  let total = 0;

  function renderCart() {
    cartItemsContainer.innerHTML = ''; // Clear previous cart items
    total = 0;

    if (cartItems.length === 0) {
      // Display message when cart is empty
      const emptyCartMessage = document.createElement('p');
      emptyCartMessage.textContent = 'Your Cart is Hungry! Add Delicious Items Now!';
      emptyCartMessage.style.fontSize = '28px';
      emptyCartMessage.style.fontWeight = 'bold';
      emptyCartMessage.style.marginTop="100px";
      emptyCartMessage.style.textAlign = 'center';
      cartItemsContainer.appendChild(emptyCartMessage);

      cartTotalElement.textContent = `Total: Rs${total.toFixed(2)}`;
    } else {
      // Render cart items if cart is not empty
      cartItems.forEach(function(item, index) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
          <img src="${item.imgUrl}" width="100px" height="100px" class="img-cart" alt="${item.name}">
          <div class="item-cart">
            <p class="cart-name"><strong>${item.name}</strong></p>
            <p class="cart-price">Price: Rs${item.price.toFixed(2)}</p>
            <div class="cart-quantity">
              Quantity: &nbsp;
              <div class="quantity"> 
                <p class="quantity-button" data-index="${index}" data-action="decrease">-</p>
                <span>${item.quantity}</span>
                <p class="quantity-button" data-index="${index}" data-action="increase">+</p>
              </div>
            </div>
          </div>
          <p class="remove-from-cart" data-index="${index}">X</p>
        `;

        cartItemsContainer.appendChild(itemElement);

        total += item.price * item.quantity;
      });

      cartTotalElement.textContent = `Total: Rs${total.toFixed(2)}`;
    }
  }

  renderCart(); // Render cart items initially

  cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('quantity-button')) {
      const index = parseInt(event.target.dataset.index);
      const action = event.target.dataset.action;

      if (action === 'decrease') {
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity -= 1;
        } else {
          cartItems.splice(index, 1); // Remove item if quantity is 1 and '-' button is clicked
        }
      } else if (action === 'increase') {
        cartItems[index].quantity += 1;
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
      renderCart(); // Re-render cart after quantity change or item removal
    }
  });

  cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-from-cart')) {
      const index = parseInt(event.target.dataset.index);
      cartItems.splice(index, 1); // Remove item from cartItems array
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
      renderCart(); // Re-render cart after item removal
    }
  });
});
