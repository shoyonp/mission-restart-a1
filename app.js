// function of loading spinner
const manageSpinner = (status, containerId = "all-products") => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById(containerId).classList.add("hidden");
  } else {
    document.getElementById(containerId).classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// display products function
const displayProducts = (products, containerId, limit) => {
  const items = limit ? products.slice(0, limit) : products;
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  items.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="card bg-base-100 shadow-md h-full">
  <figure class="h-56 flex items-center justify-center bg-gray-200 p-4">
    <img
      src="${product?.image}"
      alt="${product?.title}"
      class="h-full object-contain"
    />
  </figure>
  <div class="card-body flex flex-col justify-between">
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <h2 class="font-semibold bg-blue-100 text-blue-600 px-2 rounded-xl">
          ${product?.category}
        </h2>
        <div class="text-xs"><i class="fa-solid fa-star text-yellow-300"></i>
          ${product?.rating?.rate}/${product?.rating?.count}
        </div>
      </div>
      <p class="text-sm truncate">
        ${product?.title}
      </p>
      <p class="font-bold text-lg">
        $ ${product?.price}
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <button onclick="loadProductDetail(${product.id})" class="btn btn-outline btn-sm">
      <i class="fa-solid fa-eye"></i> Details
      </button>
      <button class="btn btn-primary btn-sm">
        <i class="fa-solid fa-cart-shopping"></i> Add
      </button>
    </div>

  </div>
</div>
    `;
    container.append(div);
  });
  manageSpinner(false, containerId);
};

// load product details
const loadProductDetail = async (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayProductDetails(data);
};

// display product details
const displayProductDetails = (detail) => {
  const detailBox = document.getElementById("details-container");
  detailBox.innerHTML = `

  <div class="grid md:grid-cols-2 gap-8">
  <div class="bg-gray-100 rounded-xl p-6 flex items-center justify-center">
    <img src="${detail?.image}" class="max-h-72 object-contain" />
  </div>
  <!-- Detail -->
  <div>
   <div class="space-y-6">
  <div>
    <span class="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
  ${detail?.category}
    </span>
  </div>
  <h2 class="text-2xl font-bold">
    ${detail?.title}
  </h2>
  <div class="flex items-center gap-2">
    <div class="flex text-yellow-400 text-sm">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
    </div>
    <span class="text-sm text-gray-500">(${detail?.rating?.rate} / ${detail?.rating?.count} reviews)</span>
  </div>
  <p class="text-gray-600 ">
   ${detail?.description}
  </p>
    <p class="text-3xl font-bold text-primary">
      $ ${detail?.price}
    </p>

    <div class="flex gap-3 pt-4">
    <button class="btn btn-primary btn-sm">
      <i class="fa-solid fa-cart-shopping mr-2"></i> Buy Now
    </button>
    <button class="btn btn-outline btn-sm">
      <i class="fa-regular fa-heart mr-2"></i>
      Wishlist
    </button>
  </div>

</div>
  </div>
</div>

`;
  document.getElementById("product_detail").showModal();
};

// for remove all active class
const removeActive = () => {
  const ctgButtons = document.querySelectorAll(".ctg-btn");
  //   console.log(ctgButtons);
  ctgButtons.forEach((btn) => btn.classList.remove("active"));
};

// load category products
const loadCategoryProduct = async (category) => {
  manageSpinner(true);
  const url = `https://fakestoreapi.com/products/category/${category}`;
  const res = await fetch(url);
  const data = await res.json();
  removeActive();
  const clickedBtn = document.getElementById(category);
  clickedBtn.classList.add("active");
  displayCategoryPdc(data);
};

// display category products
const displayCategoryPdc = (products) => {
  const container = document.getElementById("all-products");
  container.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="card bg-base-100 shadow-md h-full">
  <figure class="h-56 flex items-center justify-center bg-gray-200 p-4">
    <img
      src="${product?.image}"
      alt="${product?.title}"
      class="h-full object-contain"
    />
  </figure>
  <div class="card-body flex flex-col justify-between">
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <h2 class="font-semibold bg-blue-100 text-blue-600 px-2 rounded-xl">
          ${product?.category}
        </h2>
        <div class="text-xs"><i class="fa-solid fa-star text-yellow-300"></i>
          ${product?.rating?.rate}/${product?.rating?.count}
        </div>
      </div>
      <p class="text-sm truncate">
        ${product?.title}
      </p>
      <p class="font-bold text-lg">
        $ ${product?.price}
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <button onclick="loadProductDetail(${product.id})" class="btn btn-outline btn-sm">
      <i class="fa-solid fa-eye"></i> Details
      </button>
      <button class="btn btn-primary btn-sm">
        <i class="fa-solid fa-cart-shopping"></i> Add
      </button>
    </div>

  </div>
</div>
    `;
    container.append(div);
  });
  manageSpinner(false);
};

// display category buttons
const displayCategoryBtn = (categories) => {
  const btnContainer = document.getElementById("category-container");
  //   btnContainer.innerHTML = "";
  for (let category of categories) {
    // console.log("category after loop", category);
    const button = document.createElement("button");
    button.id = category;
    button.className = "btn p-5 text-black/90 font-normal rounded-full ctg-btn capitalize";
    button.innerText = category;
    button.addEventListener("click", () => {
      loadCategoryProduct(category);
    });

    btnContainer.append(button);
  }
};

// get category buttons
const getCategoryBtn = async () => {
  const url = "https://fakestoreapi.com/products/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategoryBtn(data);
};
getCategoryBtn();

// get all products
const getProducts = async (containerId, limit) => {
  manageSpinner(true, containerId);
  const url = "https://fakestoreapi.com/products";
  const res = await fetch(url);
  const data = await res.json();
  displayProducts(data, containerId, limit);

  //   this will execute when clicking all product button
  const allProBtn = document.getElementById("for-all-product");
  allProBtn.addEventListener("click", () => {
    allProBtn.classList.add("active");
    containerId = "all-products";
    displayProducts(data, containerId);
  });
};

// condition for data load in diffrent html page

if (document.getElementById("home-products")) {
  getProducts("home-products", 6);
} else if (document.getElementById("all-products")) {
  getProducts("all-products");
}
