document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.add-to-cart-button');
  const cartItems = document.getElementById('cart-items');
  const cartSection = document.getElementById('cart');
  const toggleCartButton = document.getElementById('toggle-cart-button');
  const clearCartButton = document.getElementById('clear-cart-button');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Función para guardar el carrito en el almacenamiento local
  function saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Función para renderizar los ítems del carrito desde el almacenamiento local
  function renderCart() {
      cartItems.innerHTML = ''; // Limpiar el contenido actual del carrito
      cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
              <span>${item.name}</span>
              <span>${item.price}</span>
              <button class="delete-button">Eliminar</button>
          `;
          cartItems.appendChild(cartItem);

          // Añadir evento al botón de eliminar
          const deleteButton = cartItem.querySelector('.delete-button');
          deleteButton.addEventListener('click', function() {
              const itemIndex = cart.indexOf(item);
              cart.splice(itemIndex, 1); // Eliminar el ítem del carrito
              saveCartToLocalStorage(); // Actualizar el almacenamiento local
              renderCart(); // Renderizar nuevamente el carrito
          });
      });
  }

  // Función para abrir y cerrar el carrito
  function toggleCart() {
      cartSection.classList.toggle('open'); // Alternar clase para abrir/cerrar el carrito
      if (cartSection.classList.contains('open')) {
          renderCart(); // Renderizar el carrito al abrirlo
      }
  }

  // Evento para abrir/cerrar el carrito al hacer clic en el botón flotante
  toggleCartButton.addEventListener('click', function() {
      toggleCart();
  });

  // Evento para eliminar todo el contenido del carrito
  clearCartButton.addEventListener('click', function() {
      if (confirm('¿Estás seguro que deseas eliminar todo?')) {
          cart.length = 0; // Vaciar el arreglo del carrito
          saveCartToLocalStorage(); // Actualizar el almacenamiento local
          renderCart(); // Renderizar nuevamente el carrito vacío
      }
  });

  // Evento para agregar productos al carrito al hacer clic en los botones de agregar
  buttons.forEach((button, index) => {
      button.addEventListener('click', function() {
          const productItem = button.parentElement;
          const productName = productItem.querySelector('h3').innerText;
          const productPrice = productItem.querySelector('p').innerText;

          // Añadir el producto al carrito (como objeto)
          cart.push({ name: productName, price: productPrice });

          saveCartToLocalStorage(); // Guardar el carrito en el almacenamiento local
          if (cartSection.classList.contains('open')) {
              renderCart(); // Si el carrito está abierto, renderizar nuevamente
          }
      });
  });
});
