function filterCheapestProducts(products) {
    
    const cheapestProducts = [];
  
    products.forEach((product) => {
      // check if product is already in productsWithLowestPrice by checking the name of the product 
      if (!cheapestProducts.find((p) => p.name === product.name)) {
        console.log('product not found in cheapest products');
        cheapestProducts.push(product);
        return;
      };
  
      for (let i = 0; i < cheapestProducts.length; i++) {
        const cheapestProduct = cheapestProducts[i];
  
        if (!(product.name === cheapestProduct.name)) {
          console.log('product name not equal cheapest product name');
          return;
        }
  
        if (product.price < cheapestProduct.price) {
          console.log('cheaper product found');
          cheapestProducts[i] = product;
        }
  
      }
    });
    return cheapestProducts;
  }