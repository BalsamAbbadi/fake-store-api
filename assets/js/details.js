const getCatigoryProduct = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');

    const { data } = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
    return data;
}

const desplyProducts = async () => {

    try {


        const products = await getCatigoryProduct();

        const result = products.map((product) => {
            return ` <div class='product'>
        <h4>${product.title}</h4>
        <img src="${product.image}" class='product-img'/>
        <p>${product.price}$</p>
        <p>Rate ${product.rating.rate}</p>
        <a href='./product.html?id=${product.id}'>more details</a>
        </div>`
        }).join('');

        document.querySelector(".products .row").innerHTML = result;


        customModal();


    } catch {
        document.querySelector(".products").innerHTML = "<p>please try again later ... </p>";
    } finally {
        document.querySelector(".loader").classList.add("d-none");
    }


}



desplyProducts();


window.onscroll = function () {
    const header = document.querySelector("header");
    const product = document.querySelector(".product");

    if (window.scrollY > product.offsetTop) {
        header.classList.add("header-scrolled");
    }

    if (window.scrollY < product.offsetTop) {
        header.classList.remove("header-scrolled");
    }
}

function customModal() {
    const modal = document.querySelector(".my-modal");
    const x = document.querySelector(".x");
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const image = Array.from(document.querySelectorAll(".product-img"));
    const element = document.querySelectorAll(".product")


    let currentIndex = 0;

    image.forEach( function(img){

        img.addEventListener('click', (e)=>{
            modal.classList.remove('d-none');
            modal.querySelector("img").setAttribute("src", e.target.src)

            const currentImg = e.target;
            currentIndex = image.indexOf(currentImg);

        });
    });


    x.addEventListener('click', (e)=>{
        modal.classList.add("d-none");
    });

    right.addEventListener('click',(e)=>{

        currentIndex ++;

        if(currentIndex == image.length){
            currentIndex=0;
        }

        const src = image[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src", src);
    
    });

    left.addEventListener('click', (e)=>{

        if(currentIndex == 0){
            currentIndex = image.length -1;
        }else{
            currentIndex--;
        }

        const src = image[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src", src);

    });



    document.addEventListener("keydown", (e)=>{
        console.log(e);

        if(e.code=="ArrowRight"){
            currentIndex ++;

        if(currentIndex == image.length){
            currentIndex=0;
        }

        const src = image[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src", src);

        }else if(e.code=="ArrowLeft"){
            if(currentIndex == 0){
                currentIndex = image.length -1;
            }else{
                currentIndex--;
            }
    
            const src = image[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src", src);
    
        }else if(e.code == "Escape"){
            modal.classList.add("d-none");
        };

    });

}




