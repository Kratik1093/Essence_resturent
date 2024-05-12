document.addEventListener("DOMContentLoaded", function() {
  // Retrieve cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Display cart items on the cart page
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  let total = 0;

  cartItems.forEach(function(item, index) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <p>Name: ${item.name}</p>
      <p>Price: Rs${item.price.toFixed(2)}</p>
      <p>Quantity: ${item.quantity}</p>
      <button class="remove-from-cart" data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  // Update total
  cartTotalElement.textContent = `Rs${total.toFixed(2)}`;

  // Add event listeners to remove buttons
  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
  removeFromCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const index = parseInt(button.dataset.index);
      // Decrease quantity by 1 if greater than 1
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
      } else {
        // Remove the item if quantity is 1 or less
        cartItems.splice(index, 1);
      }
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // Refresh the page to reflect the changes
      location.reload();
    });
  });

  // Add event listener to "Order Now" button

});

