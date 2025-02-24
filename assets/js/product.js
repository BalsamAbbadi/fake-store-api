

const getProduct = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    return data;
};

const displayProduct = async () => {
    try{

    
    const product = await getProduct();


    const result = `
        <div class="product-detail">
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}" />
            <p id="price">Price: ${product.price}$</p>
            <p id="rate">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            <p id="desc">${product.description}</p>
        </div>
    `;

    document.querySelector(".product .row").innerHTML = result;
    }catch{
        document.querySelector(".product").innerHTML = "<p>please try again later ... </p>";
    }finally{
        document.querySelector(".loader").classList.add("d-none");
    }
    
};

displayProduct();


