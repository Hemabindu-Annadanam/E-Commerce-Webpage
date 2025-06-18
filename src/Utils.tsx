// Utility functions for the app
export function filterProductsUtil(products:any, { searchTerm, selectedCategory, priceRange, minRating }:any) {
  return products.filter((product:any) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice =
      priceRange === 'under25'
        ? product.price < 25
        : priceRange === '25to50'
        ? product.price >= 25 && product.price <= 50
        : priceRange === 'above50'
        ? product.price > 50
        : true;
    const matchesRating = minRating ? product.rating?.rate >= parseFloat(minRating) : true;
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });
}
