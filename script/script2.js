const productsContents = document.getElementById("products");
const searchInput = document.getElementById("search_item");

const fetchData = async () => {
  try {
    const response = await fetch("./script/product_list.json");
    if (!response.ok) throw new Error("Failed to fetch data");

    const productData = await response.json();
    displayProducts(productData);
    searchInput.addEventListener("input", () => handleSearch(productData));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const createColorCircles = (variants) => {
  if (!variants?.length) return '';
  return `
    <div class="circles">
      ${variants.map(variant => variant?.borderColor ?
        `<div style="border:2px solid ${variant.borderColor}" class="circle_1">
           <div style="background-color:${variant.color}" class="circle_2"></div>
         </div>` :
        `<div style="background-color:${variant.color}" class="circle_3"></div>`
      ).join('')}
    </div>`;
};

const createProductTemplate = (product) => {
  return `
    <div class="products_container">
      <div class="pro_contents">
        <div class="dog img">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="products_icons">
          <a href="#"><img src="${product.heart}" class="heart_img" alt="love" /></a>
          <a href="#" id='eye_icon_container'><img src="${product.eye}" class="eye_img" alt="quick_view" /></a>
          ${product.isNewProduct ? '<span class="new">New</span>' : ''}
          ${product.offer ? `<span class="offer">${product.offer}</span>` : ''}
        </div>
        <p class="add_cart">${product.cart}</p>
      </div>
      <h4>${product.name}</h4>
      <div class="contents_bottom">
        <h4 class="amount">${product.price}</h4>
        ${product.oldPrice ? `<h4 class="old_price">${product.oldPrice}</h4>` : ''}
        <img src="${product.star}" alt="star" />
        <h4 class="bracket">${product.bracket}</h4>
      </div>
      ${createColorCircles(product.variants)}
    </div>`;
};

const displayProducts = (products) => {
  const productsTemplate = products.map(createProductTemplate).join('');
  productsContents.innerHTML = productsTemplate;
};

const handleSearch = (products) => {
  const query = searchInput.value.trim().toLowerCase();
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
  displayProducts(filteredProducts);
};

fetchData();

