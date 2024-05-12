const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const imgUrl = button.dataset.imgurl;

    // Retrieve existing cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
    } else {
      // If the item doesn't exist, add it to the cart with quantity 1
      cartItems.push({ name: name, price: price, quantity: 1, imgUrl: imgUrl });
    }

    // Store the updated cart items back into localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Optional: Display a confirmation message or update the UI to indicate the item was added to the cart
    console.log("Added", name, "to cart");
  });
});