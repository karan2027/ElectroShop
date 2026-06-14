/* =========================
   ElectroShop Full script.js
========================= */

const API_BASE = "https://electroshop-backend-pji9.onrender.com";

let otpVerified = false;

function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

function togglePassword(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

const productTypes = [
  { name: "Mobiles", category: "mobile", image: "images/p-phone.jpg" },
  { name: "Laptops", category: "laptop", image: "images/p-laptop.jpg" },
  { name: "Watches", category: "watch", image: "images/p-watch.jpg" },
  { name: "Headphones", category: "headphone", image: "images/p-headphones.jpg" },
  { name: "Airbuds", category: "airbuds", image: "images/p-airbuds.jpg" },
  { name: "Speakers", category: "speaker", image: "images/p-speaker.jpg" },
  { name: "Chargers", category: "charger", image: "images/p-charger.jpg" },
  { name: "Gaming Items", category: "gaming", image: "images/p-controller.jpg" }
];

const subcategoryData = {
  mobile: {
  title: "Explore Mobiles",
  types: [
    { name: "Latest Mobiles", image: "images/mobile-latest.png", link: "brand.html?category=mobile&type=latest" },
    { name: "Cheap Mobiles", image: "images/mobile-cheap.png", link: "brand.html?category=mobile&type=cheap" },
    { name: "5G Mobiles", image: "images/mobile-5g.png", link: "brand.html?category=mobile&type=5g" },
    { name: "Gaming Mobiles", image: "images/mobile-gaming.png", link: "brand.html?category=mobile&type=gaming" }
  ],
    brands: [
      { name: "Samsung", image: "images/samsung-s24.png", link: "brand.html?category=mobile&brand=samsung" },
      { name: "Apple", image: "images/iphone15.png", link: "brand.html?category=mobile&brand=apple" },
      { name: "OnePlus", image: "images/oneplus12.png", link: "brand.html?category=mobile&brand=oneplus" },
      { name: "Redmi", image: "images/redmi13pro.png", link: "brand.html?category=mobile&brand=redmi" }
    ]
  },

  laptop: {
  title: "Explore Laptops",
  types: [
    { name: "Gaming Laptops", image: "images/laptop-gaming.png", link: "brand.html?category=laptop&type=gaming" },
    { name: "Student Laptops", image: "images/laptop-student.png", link: "brand.html?category=laptop&type=student" },
    { name: "Business Laptops", image: "images/laptop-business.png", link: "brand.html?category=laptop&type=business" },
    { name: "Budget Laptops", image: "images/laptop-budget.png", link: "brand.html?category=laptop&type=cheap" }
  ],
    brands: [
      { name: "HP", image: "images/hp.png", link: "brand.html?category=laptop&brand=hp" },
      { name: "Dell", image: "images/dell.png", link: "brand.html?category=laptop&brand=dell" },
      { name: "Lenovo", image: "images/lenovo.png", link: "brand.html?category=laptop&brand=lenovo" },
      { name: "Asus", image: "images/asus.png", link: "brand.html?category=laptop&brand=asus" },
      { name: "Acer", image: "images/acer.jpg", link: "brand.html?category=laptop&brand=acer" },
      { name: "Apple", image: "images/apple.jpg", link: "brand.html?category=laptop&brand=apple" }
    ]
  },

  watch: {
    title: "Explore Watches",
    types: [
      { name: "Smart Watches", image: "images/watch-1.jpg", link: "brand.html?category=watch&type=smart" },
      { name: "Fitness Bands", image: "images/watch-2.jpg", link: "brand.html?category=watch&type=fitness" }
    ],
    brands: [
      { name: "Apple", image: "images/apple-watch-1.jpg", link: "brand.html?category=watch&brand=apple" },
      { name: "Samsung", image: "images/samsung-watch-1.jpg", link: "brand.html?category=watch&brand=samsung" },
      { name: "Noise", image: "images/noise-1.jpg", link: "brand.html?category=watch&brand=noise" },
      { name: "Boat", image: "images/boat-1.jpg", link: "brand.html?category=watch&brand=boat" }
    ]
  },

  headphone: {
    title: "Explore Headphones",
    types: [
      { name: "Wireless Headphones", image: "images/p-headphones.jpg", link: "brand.html?category=headphone&type=wireless" },
      { name: "Gaming Headphones", image: "images/headphone-1.jpg", link: "brand.html?category=headphone&type=gaming" }
    ],
    brands: [
      { name: "Boat", image: "images/boat-1.jpg", link: "brand.html?category=headphone&brand=boat" },
      { name: "Sony", image: "images/sony-1.jpg", link: "brand.html?category=headphone&brand=sony" },
      { name: "JBL", image: "images/jbl-1.jpg", link: "brand.html?category=headphone&brand=jbl" }
    ]
  },

  airbuds: {
    title: "Explore Airbuds",
    types: [
      { name: "Gaming Airbuds", image: "images/p-airbuds.jpg", link: "brand.html?category=airbuds&type=gaming" },
      { name: "Premium Airbuds", image: "images/p-airbuds.jpg", link: "brand.html?category=airbuds&type=premium" }
    ],
    brands: [
      { name: "Apple", image: "images/apple-1.jpg", link: "brand.html?category=airbuds&brand=apple" },
      { name: "Boat", image: "images/boat-1.jpg", link: "brand.html?category=airbuds&brand=boat" },
      { name: "OnePlus", image: "images/oneplus-1.jpg", link: "brand.html?category=airbuds&brand=oneplus" }
    ]
  },

  speaker: {
    title: "Explore Speakers",
    types: [
      { name: "Bluetooth Speakers", image: "images/p-speaker.jpg", link: "brand.html?category=speaker&type=bluetooth" },
      { name: "Bass Speakers", image: "images/speaker-1.jpg", link: "brand.html?category=speaker&type=bass" }
    ],
    brands: [
      { name: "JBL", image: "images/jbl-1.jpg", link: "brand.html?category=speaker&brand=jbl" },
      { name: "Sony", image: "images/sony-1.jpg", link: "brand.html?category=speaker&brand=sony" },
      { name: "Boat", image: "images/boat-1.jpg", link: "brand.html?category=speaker&brand=boat" }
    ]
  },

  charger: {
    title: "Explore Chargers",
    types: [
      { name: "Fast Chargers", image: "images/accessories-1.jpg", link: "brand.html?category=charger&type=fast" },
      { name: "Wireless Chargers", image: "images/accessories-1.jpg", link: "brand.html?category=charger&type=wireless" }
    ],
    brands: [
      { name: "Apple", image: "images/apple-1.jpg", link: "brand.html?category=charger&brand=apple" },
      { name: "Samsung", image: "images/samsung-1.jpg", link: "brand.html?category=charger&brand=samsung" },
      { name: "Boat", image: "images/boat-1.jpg", link: "brand.html?category=charger&brand=boat" }
    ]
  },

  gaming: {
    title: "Explore Gaming Items",
    types: [
      { name: "Controllers", image: "images/p-controller.jpg", link: "brand.html?category=gaming&type=controller" },
      { name: "Gaming Accessories", image: "images/controller-1.jpg", link: "brand.html?category=gaming&type=accessory" }
    ],
    brands: [
      { name: "Sony", image: "images/sony-1.jpg", link: "brand.html?category=gaming&brand=sony" },
      { name: "Zebronics", image: "images/zebronics-1.jpg", link: "brand.html?category=gaming&brand=zebronics" }
    ]
  }
};

const allProducts = [
  { id: "samsung-s24", category: "mobile", brand: "samsung", type: "latest", name: "Samsung Galaxy S24", price: 89999, image: "images/samsung-s24.png", ram: "8GB", storage: "256GB", camera: "50MP", battery: "4000mAh", processor: "Snapdragon 8 Gen 3" },
  { id: "iphone15", category: "mobile", brand: "apple", type: "latest", name: "iPhone 15", price: 79999, image: "images/iPhone15.png", ram: "6GB", storage: "128GB", camera: "48MP", battery: "3349mAh", processor: "A16 Bionic" },
  { id: "oneplus12", category: "mobile", brand: "oneplus", type: "gaming", name: "OnePlus 12", price: 64999, image: "images/oneplus12.png", ram: "12GB", storage: "256GB", camera: "50MP", battery: "5400mAh", processor: "Snapdragon 8 Gen 3" },
  { id: "redmi-note13", category: "mobile", brand: "redmi", type: "cheap", name: "Redmi Note 13 Pro", price: 24999, image: "images/redmi13pro.png", ram: "8GB", storage: "128GB", camera: "200MP", battery: "5100mAh", processor: "Snapdragon 7s Gen 2" },

  { id: "hp-pavilion", category: "laptop", brand: "hp", type: "student", name: "HP Pavilion 15", price: 62999, image: "images/hp pavilion 15.png", ram: "16GB", storage: "512GB SSD", camera: "HD Webcam", battery: "8 Hours", processor: "Intel i5" },
  { id: "dell-inspiron", category: "laptop", brand: "dell", type: "business", name: "Dell Inspiron 15", price: 58999, image: "images/dell inspiron 15.png", ram: "8GB", storage: "512GB SSD", camera: "HD Webcam", battery: "7 Hours", processor: "Intel i5" },
  { id: "lenovo-ideapad", category: "laptop", brand: "lenovo", type: "student", name: "Lenovo Ideapad", price: 46999, image: "images/lenovo ideopad.png", ram: "8GB", storage: "512GB SSD", camera: "HD Webcam", battery: "8 Hours", processor: "Ryzen 5" },
  { id: "asus-vivobook", category: "laptop", brand: "asus", type: "gaming", name: "Asus Vivobook Pro", price: 72999, image: "images/Asus Vivobook Pro.png", ram: "16GB", storage: "512GB SSD", camera: "HD Webcam", battery: "6 Hours", processor: "Ryzen 7" },
  { id: "acer-aspire", category: "laptop", brand: "acer", type: "cheap", name: "Acer Aspire 7", price: 52999, image: "images/Acer Aspire 7.png", ram: "8GB", storage: "512GB SSD", camera: "HD Webcam", battery: "7 Hours", processor: "Intel i5" },
  { id: "macbook-air", category: "laptop", brand: "apple", type: "business", name: "MacBook Air M2", price: 99999, image: "images/macbook.png", ram: "8GB", storage: "256GB SSD", camera: "1080p", battery: "18 Hours", processor: "Apple M2" },

  { id: "apple-watch9", category: "watch", brand: "apple", type: "smart", name: "Apple Watch Series 9", price: 41999, image: "images/p-watch.jpg", ram: "N/A", storage: "64GB", camera: "N/A", battery: "18 Hours", processor: "S9 Chip" },
  { id: "samsung-watch6", category: "watch", brand: "samsung", type: "smart", name: "Samsung Galaxy Watch 6", price: 27999, image: "images/p-watch.jpg", ram: "2GB", storage: "16GB", camera: "N/A", battery: "40 Hours", processor: "Exynos W930" },

  { id: "boat-headphone", category: "headphone", brand: "boat", type: "wireless", name: "Boat Wireless Headphones", price: 2999, image: "images/p-headphones.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "30 Hours", processor: "Bluetooth 5.3" },
  { id: "sony-headphone", category: "headphone", brand: "sony", type: "wireless", name: "Sony Premium Headphones", price: 9999, image: "images/p-headphones.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "35 Hours", processor: "Noise Cancellation" },

  { id: "apple-airbuds", category: "airbuds", brand: "apple", type: "premium", name: "Apple AirPods", price: 19999, image: "images/p-airbuds.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "24 Hours", processor: "H2 Chip" },
  { id: "boat-airbuds", category: "airbuds", brand: "boat", type: "gaming", name: "Boat Airbuds", price: 2499, image: "images/p-airbuds.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "30 Hours", processor: "Low Latency" },

  { id: "jbl-speaker", category: "speaker", brand: "jbl", type: "bluetooth", name: "JBL Bluetooth Speaker", price: 4999, image: "images/p-speaker.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "12 Hours", processor: "Bass Boost" },
  { id: "sony-speaker", category: "speaker", brand: "sony", type: "bass", name: "Sony Bass Speaker", price: 6999, image: "images/p-speaker.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "16 Hours", processor: "Extra Bass" },

  { id: "apple-charger", category: "charger", brand: "apple", type: "fast", name: "Apple Fast Charger", price: 1999, image: "images/accessories-1.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "N/A", processor: "20W Fast Charge" },
  { id: "samsung-charger", category: "charger", brand: "samsung", type: "fast", name: "Samsung Fast Charger", price: 1499, image: "images/accessories-1.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "N/A", processor: "25W Fast Charge" },

  { id: "sony-controller", category: "gaming", brand: "sony", type: "controller", name: "Sony Gaming Controller", price: 5999, image: "images/p-controller.jpg", ram: "N/A", storage: "N/A", camera: "N/A", battery: "10 Hours", processor: "Wireless Controller" }
];

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const userId = localStorage.getItem("userId");

  if (!cartCount) return;

  if (!userId) {
    cartCount.innerText = "0";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/cart/${userId}`);
    const data = await res.json();

    if (!data.items) {
      cartCount.innerText = "0";
      return;
    }

    let total = 0;
    data.items.forEach(item => {
      total += item.quantity;
    });

    cartCount.innerText = total;
  } catch (error) {
    console.log("Cart count error", error);
  }
}

function handleSearch() {
  const input = document.getElementById("globalSearch");

  if (!input || input.value.trim() === "") {
    alert("Enter product name to search");
    return;
  }

  const searchText = input.value.trim().toLowerCase();
  window.location.href = `brand.html?search=${encodeURIComponent(searchText)}`;
}

function getFilteredProducts() {
  const category = getParam("category");
  const brand = getParam("brand");
  const type = getParam("type");
  const price = getParam("price");
  const search = getParam("search");

  let products = [...allProducts];

  if (category) products = products.filter(p => p.category === category);
  if (brand) products = products.filter(p => p.brand === brand);
  if (type) products = products.filter(p => p.type === type);

  if (price === "low") products = products.filter(p => p.price < 20000);
  if (price === "mid") products = products.filter(p => p.price >= 20000 && p.price <= 60000);
  if (price === "high") products = products.filter(p => p.price > 60000);

  if (search) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.brand.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );
  }

  return products;
}

function renderProductCards(products) {
  const productContainer = document.getElementById("product-container");
  if (!productContainer) return;

  productContainer.innerHTML = "";

  if (products.length === 0) {
    productContainer.innerHTML = `<h3>No products found.</h3>`;
    return;
  }

  products.forEach(product => {
    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price.toLocaleString()}</p>
        <p class="specs">${product.ram} RAM | ${product.storage}</p>
        <p class="specs">${product.camera} | ${product.battery}</p>

        <div class="product-actions">
          <a href="product-details.html?id=${product.id}" class="small-btn">View Details</a>
          <button onclick="addToCartById('${product.id}')">Add to Cart</button>
          <button onclick="addToCompare('${product.id}')">Compare</button>
        </div>
      </div>
    `;
  });
}

function renderBrandPage() {
  const productContainer = document.getElementById("product-container");
  const brandTitle = document.getElementById("brand-title");

  if (!productContainer || !brandTitle) return;

  const category = getParam("category");
  const brand = getParam("brand");
  const type = getParam("type");
  const search = getParam("search");

  if (search) brandTitle.innerText = `Search Results for "${search}"`;
  else if (brand && category) brandTitle.innerText = `${brand.toUpperCase()} ${category.toUpperCase()} Products`;
  else if (type && category) brandTitle.innerText = `${type.toUpperCase()} ${category.toUpperCase()} Products`;
  else brandTitle.innerText = "All Products";

  renderProductCards(getFilteredProducts());
}

function setupBrandFilters() {
  const searchInput = document.getElementById("searchInput");
  const priceFilter = document.getElementById("priceFilter");

  if (!searchInput || !priceFilter) return;

  function applyFilters() {
    let products = getFilteredProducts();
    const keyword = searchInput.value.toLowerCase();
    const priceValue = priceFilter.value;

    if (keyword) {
      products = products.filter(p => p.name.toLowerCase().includes(keyword));
    }

    if (priceValue === "low") products = products.filter(p => p.price < 20000);
    if (priceValue === "mid") products = products.filter(p => p.price >= 20000 && p.price <= 60000);
    if (priceValue === "high") products = products.filter(p => p.price > 60000);

    renderProductCards(products);
  }

  searchInput.addEventListener("input", applyFilters);
  priceFilter.addEventListener("change", applyFilters);
}

function renderSubcategoryPage() {
  const title = document.getElementById("subcategory-title");
  const typeContainer = document.getElementById("type-container");
  const brandContainer = document.getElementById("brand-container");
  const sliderTrack = document.getElementById("slider-track");

  if (!title || !typeContainer || !brandContainer) return;

  const category = getParam("category") || "mobile";
  const data = subcategoryData[category] || subcategoryData.mobile;

  title.innerText = data.title;
  typeContainer.innerHTML = "";
  brandContainer.innerHTML = "";

  data.types.forEach(item => {
    typeContainer.innerHTML += `
      <a href="${item.link}" class="home-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
      </a>
    `;
  });

  data.brands.forEach(item => {
    brandContainer.innerHTML += `
      <a href="${item.link}" class="home-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
      </a>
    `;
  });

  if (sliderTrack) {
  const latest = allProducts.filter(p => p.category === category);
  sliderTrack.innerHTML = "";

  [...latest, ...latest].forEach(product => {
    sliderTrack.innerHTML += `
      <a href="product-details.html?id=${product.id}" class="slider-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price.toLocaleString()}</p>
      </a>
    `;
  });
}
}

function renderProductsPage() {
  const typeBox = document.getElementById("all-product-types");
  const bestBox = document.getElementById("best-selling-products");
  const homeBest = document.getElementById("home-best-products");

  if (typeBox) {
    typeBox.innerHTML = "";
    productTypes.forEach(item => {
      typeBox.innerHTML += `
        <a href="subcategory.html?category=${item.category}" class="home-card">
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
        </a>
      `;
    });
  }

  const bestProducts = allProducts.slice(0, 8);

  if (bestBox) {
    bestBox.innerHTML = "";
    bestProducts.forEach(product => {
      bestBox.innerHTML += `
        <a href="product-details.html?id=${product.id}" class="home-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price.toLocaleString()}</p>
        </a>
      `;
    });
  }

  if (homeBest) {
    homeBest.innerHTML = "";
    bestProducts.slice(0, 4).forEach(product => {
      homeBest.innerHTML += `
        <a href="product-details.html?id=${product.id}" class="home-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price.toLocaleString()}</p>
        </a>
      `;
    });
  }
}

function setupShopForm() {
  const shopForm = document.getElementById("shopForm");

  if (!shopForm) return;

  shopForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const category = document.getElementById("shopCategory").value;
    const price = document.getElementById("shopPrice").value;

    window.location.href = `brand.html?category=${category}&price=${price}`;
  });
}

function renderProductDetails() 

{
  const container = document.getElementById("details-container");

  if (!container) return;

  const id = getParam("id");
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    container.innerHTML = `<h2>Product not found</h2>`;
    return;
  }

  container.innerHTML = `
    <div class="details-image-box">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="details-info-box">
      <h1>${product.name}</h1>
      <h2>₹${product.price.toLocaleString()}</h2>
      <p class="details-desc">Premium quality product with modern features and reliable performance.</p>

      <div class="spec-table">
        <div><span>RAM</span><b>${product.ram}</b></div>
        <div><span>Storage</span><b>${product.storage}</b></div>
        <div><span>Camera</span><b>${product.camera}</b></div>
        <div><span>Battery</span><b>${product.battery}</b></div>
        <div><span>Processor</span><b>${product.processor}</b></div>
      </div>

      <button class="details-cart-btn" onclick="addToCartById('${product.id}')">Add to Cart</button>
      <button class="details-cart-btn" onclick="addToCompare('${product.id}')">Compare</button>
    </div>
  `;
  const writeReviewBtn = document.getElementById("writeReviewBtn");

writeReviewBtn.href =
  `review.html?productId=${product.id}&name=${encodeURIComponent(product.name)}`;

loadReviews(product.id);

}

async function loadReviews(productId) {
  const reviewsList = document.getElementById("reviewsList");

  try {
    const res = await fetch(`https://electroshop-backend-pji9.onrender.com/api/reviews/${productId}`);
    const reviews = await res.json();

    if (reviews.length === 0) {
      reviewsList.innerHTML = `<p class="no-review">No reviews yet. Be the first to review.</p>`;
      return;
    }

    reviewsList.innerHTML = reviews.map(review => {
      return `
        <div class="review-item">
          <div class="review-top">
            <h3>${review.userName}</h3>
            <span>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
          </div>

          <p>${review.comment}</p>

          ${
            review.image
              ? `<img src="https://electroshop-backend-pji9.onrender.com${review.image}" class="review-photo">`
              : ""
          }
        </div>
      `;
    }).join("");

  } catch (error) {
    reviewsList.innerHTML = `<p class="no-review">Unable to load reviews.</p>`;
  }
}


async function addToCartById(id) {
  const product = allProducts.find(p => p.id === id);
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first ❌");
    window.location.href = "login.html";
    return;
  }

  if (!product) {
    alert("Product not found ❌");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        product: {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Added to cart ✅");
      updateCartCount();
    } else {
      alert(data.message || "Add to cart failed ❌");
    }
  } catch (error) {
    alert("Server error while adding cart ❌");
  }
}

async function removeCartItemFromDB(productId) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Login first ❌");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/cart/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, productId })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Item removed ✅");
      renderCartPage();
      updateCartCount();
    } else {
      alert(data.message || "Remove failed ❌");
    }
  } catch (error) {
    alert("Server error while removing item ❌");
  }
}

async function renderCartPage() {
  if (!isLoggedIn() && window.location.pathname.includes("cart.html")) {
    window.location.href = "login.html";
    return;
  }

  const userId = localStorage.getItem("userId");

  if (!userId) return;

  try {
    const res = await fetch(`${API_BASE}/api/cart/${userId}`);
    const data = await res.json();

    const cartItems = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const deliveryEl = document.getElementById("delivery");
    const totalEl = document.getElementById("total");

    if (!cartItems || !subtotalEl || !deliveryEl || !totalEl) return;

    cartItems.innerHTML = "";

    if (!data.items || data.items.length === 0) {
      cartItems.innerHTML = `<h2>Your cart is empty 🛒</h2>`;
      subtotalEl.innerText = "0";
      deliveryEl.innerText = "0";
      totalEl.innerText = "0";
      return;
    }

    let subtotal = 0;

    data.items.forEach(item => {
      subtotal += item.price * item.quantity;

      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}">
          <div>
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <p>Qty: ${item.quantity}</p>
            <button class="remove-btn" onclick="removeCartItemFromDB('${item.productId}')">
              Remove
            </button>
          </div>
        </div>
      `;
    });

    const delivery = 99;

    subtotalEl.innerText = subtotal;
    deliveryEl.innerText = delivery;
    totalEl.innerText = subtotal + delivery;
  } catch (error) {
    console.log("Cart render error", error);
  }
}

function getCompareKey() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return null;
  }

  return `compare_${userId}`;
}

function getCompare() {
  const key = getCompareKey();

  if (!key) {
    return [];
  }

  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveCompare(compare) {
  const key = getCompareKey();

  if (!key) {
    alert("Please login first to compare products ❌");
    window.location.href = "login.html";
    return;
  }

  localStorage.setItem(key, JSON.stringify(compare));
}

function addToCompare(id) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first to compare products ❌");
    window.location.href = "login.html";
    return;
  }

  const product = allProducts.find(p => p.id === id);

  if (!product) {
    alert("Product not found ❌");
    return;
  }

  let compare = getCompare();

  if (compare.length >= 3) {
    alert("You can compare only 3 products");
    return;
  }

  if (compare.find(p => p.id === id)) {
    alert("This product is already added");
    return;
  }

  if (compare.length > 0 && compare[0].category !== product.category) {
    alert("You can compare only same type products");
    return;
  }

  compare.push(product);
  saveCompare(compare);

  alert(product.name + " added to compare ✅");
}

function removeCompareItem(index) {
  const compare = getCompare();
  compare.splice(index, 1);
  saveCompare(compare);
  renderComparePage();
}

function renderComparePage() {
  const container = document.getElementById("compare-container");
  if (!container) return;

  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "login.html";
    return;
  }

  const compare = getCompare();

  if (compare.length === 0) {
    container.innerHTML = `<h3>No products added for comparison.</h3>`;
    return;
  }

  container.innerHTML = `
    <table class="compare-table">
      <tr>
        <th>Attribute</th>
        ${compare.map(p => `<th>${p.name}</th>`).join("")}
      </tr>
      <tr>
        <td>Image</td>
        ${compare.map(p => `<td><img src="${p.image}"></td>`).join("")}
      </tr>
      <tr><td>Price</td>${compare.map(p => `<td>₹${p.price.toLocaleString()}</td>`).join("")}</tr>
      <tr><td>RAM</td>${compare.map(p => `<td>${p.ram}</td>`).join("")}</tr>
      <tr><td>Storage</td>${compare.map(p => `<td>${p.storage}</td>`).join("")}</tr>
      <tr><td>Camera</td>${compare.map(p => `<td>${p.camera}</td>`).join("")}</tr>
      <tr><td>Battery</td>${compare.map(p => `<td>${p.battery}</td>`).join("")}</tr>
      <tr><td>Processor</td>${compare.map(p => `<td>${p.processor}</td>`).join("")}</tr>
      <tr>
        <td>Remove</td>
        ${compare.map((p, i) => `<td><button onclick="removeCompareItem(${i})">Remove</button></td>`).join("")}
      </tr>
    </table>
  `;
}

function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleText = document.getElementById("toggleText");
  const authTitle = document.getElementById("authTitle");

  if (!loginForm || !signupForm || !toggleText) return;

  if (signupForm.style.display === "none") {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    toggleText.innerText = "Already registered? Login here";
    if (authTitle) authTitle.innerText = "Create Account ✨";
  } else {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    toggleText.innerText = "New user? Create an account first";
    if (authTitle) authTitle.innerText = "Login 🔐";
  }
}

async function sendSignupOTP() {
  const email = document.getElementById("signupEmail").value.trim();

  if (!email.endsWith("@gmail.com")) {
    alert("Please enter valid Gmail address ❌");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.ok) {
      alert("OTP sent to your Gmail ✅");

      document.getElementById("signupOTP").style.display = "block";
      document.getElementById("verifyOtpBtn").style.display = "block";
      document.getElementById("resendOtpBtn").style.display = "inline-block";
      document.getElementById("sendOtpBtn").style.display = "none";
    } else {
      alert(data.message || "OTP send failed ❌");
    }
  } catch (error) {
    alert("Server error. Backend start hai ya nahi check karo ❌");
  }
}

async function verifySignupOTP() {
  const email = document.getElementById("signupEmail").value.trim();
  const otp = document.getElementById("signupOTP").value.trim();

  if (otp === "") {
    alert("Please enter OTP ❌");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (res.ok) {
      alert("OTP verified ✅ Now create password");

      otpVerified = true;

      document.getElementById("passwordBox").style.display = "block";
      document.getElementById("createAccountBtn").style.display = "block";
      document.getElementById("verifyOtpBtn").style.display = "none";
    } else {
      alert(data.message || "OTP verification failed ❌");
    }
  } catch (error) {
    alert("Server error during OTP verify ❌");
  }
}

function setupAuthForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (!email || !password) {
        alert("Please fill email and password ❌");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert("Login successful ✅");

          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userEmail", data.user.email);

          window.location.href = "index.html";
        } else {
          alert(data.message || "Email not registered or wrong password ❌");
        }
      } catch (error) {
        alert("Server error during login ❌");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      if (!otpVerified) {
        alert("Please verify OTP first ❌");
        return;
      }

      if (!name || !email || !password) {
        alert("Please fill all details ❌");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters ❌");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert("Account created successfully ✅ Now please login");

          otpVerified = false;

          signupForm.style.display = "none";
          loginForm.style.display = "block";

          const toggleText = document.getElementById("toggleText");
          const authTitle = document.getElementById("authTitle");

          if (toggleText) toggleText.innerText = "New user? Create an account first";
          if (authTitle) authTitle.innerText = "Login 🔐";

          document.getElementById("loginEmail").value = email;
          document.getElementById("loginPassword").value = "";
          document.getElementById("loginPassword").focus();
        } else {
          alert(data.message || "Signup failed ❌");
        }
      } catch (error) {
        alert("Server error during signup ❌");
      }
    });
  }
}

async function placeOrder() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/orders/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Order placed ✅");
      renderCartPage();
      updateCartCount();
    } else {
      alert(data.message || "Order failed ❌");
    }
  } catch (error) {
    alert("Server error during order ❌");
  }
}

async function renderOrdersPage() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/orders/${userId}`);
    const orders = await res.json();

    const container = document.getElementById("orders-container");
    if (!container) return;

    container.innerHTML = "";

    if (!orders || orders.length === 0) {
      container.innerHTML = "<h2>No orders yet 😢</h2>";
      return;
    }

    orders.forEach(order => {
      let itemsHTML = "";

      order.items.forEach(item => {
        itemsHTML += `
          <div>
            <img src="${item.image}" width="50">
            ${item.name} × ${item.quantity}
          </div>
        `;
      });

      container.innerHTML += `
        <div class="order-box">
          <h3>Order ID: ${order._id}</h3>
          ${itemsHTML}
          <p>Total: ₹${order.total}</p>
          <p>Status: ${order.status}</p>
        </div>
      `;
    });
  } catch (error) {
    console.log("Orders error", error);
  }
}

function controlNavbar() {
  const loggedIn = isLoggedIn();

  const ordersLink = document.getElementById("orders-link");
  const loginLink = document.getElementById("login-link");
  const profileLink = document.getElementById("profile-link");
  const userName = document.getElementById("user-name");

  if (ordersLink) {
    ordersLink.style.display = loggedIn ? "inline" : "none";
  }

  if (loginLink) {
    loginLink.style.display = loggedIn ? "none" : "inline-flex";
  }

  if (profileLink) {
    profileLink.style.display = loggedIn ? "flex" : "none";
  }

  if (userName) {
    const name = localStorage.getItem("userName") || "";
    userName.innerText = loggedIn && name ? "Welcome, " + name : "";
  }
}

function toggleProfileMenu() {
  const dropdown = document.getElementById("profileDropdown");
  if (!dropdown) return;
  dropdown.classList.toggle("show");
}

function closeProfileMenuOnOutsideClick(event) {
  const profileMenu = document.querySelector(".profile-menu");
  const dropdown = document.getElementById("profileDropdown");

  if (!profileMenu || !dropdown) return;

  if (!profileMenu.contains(event.target)) {
    dropdown.classList.remove("show");
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");

  window.location.href = "index.html";
}

function getProfileKey() {
  const userId = localStorage.getItem("userId");
  return userId ? `profile_${userId}` : null;
}

function loadProfile() {
  const profileForm = document.getElementById("profileForm");

  if (!profileForm) return;

  if (!isLoggedIn()) {
    alert("Please login first ⚠️");
    window.location.href = "login.html";
    return;
  }

  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profileMobile = document.getElementById("profileMobile");
  const profileAddress = document.getElementById("profileAddress");

  const profileKey = getProfileKey();
  const savedProfile = JSON.parse(localStorage.getItem(profileKey)) || {};

  if (profileName) {
    profileName.value = savedProfile.name || localStorage.getItem("userName") || "";
  }

  if (profileEmail) {
    profileEmail.value = savedProfile.email || localStorage.getItem("userEmail") || "";
  }

  if (profileMobile) {
    profileMobile.value = savedProfile.mobile || "";
  }

  if (profileAddress) {
    profileAddress.value = savedProfile.address || "";
  }

  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const profileData = {
      name: profileName.value.trim(),
      email: profileEmail.value.trim(),
      mobile: profileMobile.value.trim(),
      address: profileAddress.value.trim()
    };

    localStorage.setItem(profileKey, JSON.stringify(profileData));

    localStorage.setItem("userName", profileData.name);
    localStorage.setItem("userEmail", profileData.email);

    alert("Profile saved successfully ✅");
    controlNavbar();
  });
}

function handleProfileClick() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) {
    dropdown.classList.toggle("show");
  }
}

function controlNavbar() {
  const ordersLink = document.getElementById("orders-link");

  if (ordersLink) {
    ordersLink.style.display = isLoggedIn() ? "inline" : "none";
  }
}

document.addEventListener("click", closeProfileMenuOnOutsideClick);

document.addEventListener("DOMContentLoaded", () => {
  controlNavbar();
  updateCartCount();
  loadProfile();

  renderSubcategoryPage();
  renderBrandPage();
  setupBrandFilters();
  renderProductDetails();
  setupAuthForms();
  setupShopForm();
  renderProductsPage();
  renderComparePage();

  if (window.location.pathname.includes("cart.html")) {
    renderCartPage();
  }

  if (window.location.pathname.includes("orders.html")) {
    renderOrdersPage();
  }
});

function showSearchSuggestions() {
  const input = document.getElementById("globalSearch");
  const suggestionBox = document.getElementById("searchSuggestions");

  if (!input || !suggestionBox) return;

  const keyword = input.value.trim().toLowerCase();

  if (keyword === "") {
    suggestionBox.style.display = "none";
    suggestionBox.innerHTML = "";
    return;
  }

  const matchedProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.brand.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword)
  );

  if (matchedProducts.length === 0) {
    suggestionBox.innerHTML = `
      <div class="search-suggestion-item">
        <span>No product found</span>
      </div>
    `;
    suggestionBox.style.display = "block";
    return;
  }

  suggestionBox.innerHTML = "";

  matchedProducts.slice(0, 6).forEach(product => {
    suggestionBox.innerHTML += `
      <div class="search-suggestion-item" onclick="openSearchedProduct('${product.id}')">
        <img src="${product.image}" alt="${product.name}">
        <span>
          <b>${product.name}</b><br>
          ₹${product.price.toLocaleString()}
        </span>
      </div>
    `;
  });

  suggestionBox.style.display = "block";
}

function openSearchedProduct(productId) {
  window.location.href = `product-details.html?id=${productId}`;
}

function searchOnEnter(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
}