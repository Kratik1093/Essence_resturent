document.addEventListener("DOMContentLoaded", function() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  let total = 0;

  cartItems.forEach(function(item, index) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.style.display = 'flex'; // Apply flex display to the cart item
    itemElement.style.width = '100%';

    itemElement.innerHTML = `
      <img src="${item.imgUrl}" width="100px" height="100px" alt="${item.name}">
      <div>
        <p><strong>${item.name}</strong></p>
        <p>Price: Rs${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <button class="remove-from-cart" data-index="${index}"><i class="fas fa-times"></i></button>
    `;

    cartItemsContainer.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `Total: Rs${total.toFixed(2)}`;

  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
  removeFromCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const index = parseInt(button.dataset.index);
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
      } else {
        cartItems.splice(index, 1);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      location.reload(); // Refresh the page to reflect changes
    });
  });
});
