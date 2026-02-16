// display products function
const displayProducts = (products, containerId, limit) => {
  const items = limit ? products.slice(0, limit) : products;
  container = document.getElementById(containerId);
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
      <p class="text-sm">
        ${product?.title}
      </p>
      <p class="font-bold text-lg">
        $ ${product?.price}
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <button class="btn btn-outline btn-sm">
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
};

// get all products
const getProducts = async (containerId, limit) => {
  const url = "https://fakestoreapi.com/products";
  const res = await fetch(url);
  const data = await res.json();
  displayProducts(data, containerId, limit);
};

// condition for data load in diffrent html page

if (document.getElementById("home-products")) {
  getProducts("home-products", 6);
} else if (document.getElementById("all-products")) {
  getProducts("all-products");
}
