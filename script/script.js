const getdata = async () => {
  let category_template = ``;
  try {
    const res = await fetch("./script/data.json");
    if (!res.ok) {
      throw new Error();
    }

    const data = await res.json();

    data.map((category) => {
      category_template += `
                  <div class="category_items">
                    <div class="category_contents">
                      <img src="${category.image}" alt="${category.name}">
                      <h4>${category.name}</h4>
                    </div>
                  </div>`;
    });
    category_contents.innerHTML = category_template;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

let category_contents = document.getElementById("category_flex");

getdata();

const fetchData = async () => {
  let products_template = ``;
  try {
    const respo = await fetch("./script/products.json");
    if (!respo.ok) {
      throw new Error();
    }

    const product_data = await respo.json();

    product_data.map((products) => {

      let colorCircles = '';
      if (products.variants?.length) {
        colorCircles = `<div class="circles">`;
        products.variants.forEach(variant => {
          colorCircles += variant?.borderColor ? `
             <div style="border:2px solid ${variant?.borderColor}" class="circle_1">
                <div style="background-color:${variant?.color}" class="circle_2"></div>
             </div>`:
            `<div style="background-color:${variant?.color}" class="circle_3"></div>`;
        });
        colorCircles += `</div>`;
      }

      products_template += `
        <div class="products_container">
        <div class="pro_contents">
          <div class="dog img">
            <img src="${products.image}" alt="${products.name}" />
          </div>
          <div class="products_icons">
            <a href="#"><img src="${products.heart}" class="heart_img" alt="love" /></a>
            <a href="#" id='eye_icon_container'><img src="${products.eye}" class="eye_img" alt="quick_view" /></a>
            ${products.isNewProduct ? '<span class="new">New</span>' : ''
        }
          </div >
          <p class="add_cart">${products.cart}</p>
        </div >
        <h4>${products.name}</h4>
        <div class="contents_bottom">
          <h4 class="amount">${products.price}</h4>
          <img src="${products.star}" alt="star" />
          <h4 class="bracket">${products.bracket}</h4>
        </div>
        ${products.variants?.length ? `${colorCircles}` : ''}
      </div > `;
    });

    products_contents.innerHTML = products_template;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

let products_contents = document.getElementById("products");
fetchData();














