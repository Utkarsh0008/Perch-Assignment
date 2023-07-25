// Function to calculate the discounted price 
function calculateDiscountedPrice(originalPrice) {
    if (originalPrice < 20) {
      return originalPrice; // No discount if the cost of the item is less than $20
    } else if (originalPrice < 100) {
      return originalPrice * 0.8; // 20% discount
    } else if (originalPrice < 500) {
      return originalPrice * 0.7; // 30% discount
    } else {
      return originalPrice * 0.6; // 40% discount
    }
  }
  
  // Function to update the displayed discounted prices
  function updateDiscountedPrices() {
    const productCards = document.querySelectorAll('.product-card');
  
    productCards.forEach((card) => {
      const productId = card.dataset.productId;
      const priceElement = card.querySelector(`.price-${productId}`);
      const originalPrice = parseFloat(priceElement.textContent);
  
      if (isNaN(originalPrice)) {
        priceElement.textContent = 'Invalid Price';
      } else {
        const discountedPrice = calculateDiscountedPrice(originalPrice);
        priceElement.textContent = discountedPrice.toFixed(2);
      }
    });
  }
  
  // Asynchronously load product data and generate product cards
  fetch('products.json')
    .then((response) => response.json())
    .then((data) => {
      const productContainer = document.getElementById('product-container');
  
      data.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.productId = product.id;
  
        const imageElement = document.createElement('img');
        imageElement.src = product.imageUrl;
        productCard.appendChild(imageElement);
  
        const nameElement = document.createElement('p');
        nameElement.textContent = product.name;
        productCard.appendChild(nameElement);
  
        const priceElement = document.createElement('p');
        priceElement.classList.add(`price-${product.id}`);
        priceElement.textContent = product.price;
        productCard.appendChild(priceElement);
  
        productContainer.appendChild(productCard);
      });
  
      // After generating product cards, updating the discounted prices
      updateDiscountedPrices();
    })
    .catch((error) => {
      console.error('Error fetching product data:', error);
    });
  
  // Function to handle  discount rate validation
  function validateDiscountRate(discountRate) {
    if (typeof discountRate !== 'number' || discountRate <= 0 || discountRate >= 1) {
      return false;
    }
    return true;
  }
  
  // Function to handle  minimum item cost validation
  function validateMinimumItemCost(minimumCost) {
    if (typeof minimumCost !== 'number' || minimumCost < 0) {
      return false;
    }
    return true;
  }
  