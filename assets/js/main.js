
const getCategories = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products/categories");
    return data;

}

const desplayCatigories = async () => {

    try {

        const categories = await getCategories();

        const result = categories.map((category) => {
            return `
         <div class='category' >
         <h2>${category}</h2>
         <a href="./details.html?category=${category}"> details </a>
         </div>
         `
        }).join('');

        document.querySelector(".catigories .row").innerHTML = result;


    } catch (error) {
        document.querySelector(".catigories").innerHTML = "<p>please try again later ...</p>";
        alert("error to get data");

    } finally {
        document.querySelector(".loader").classList.add("d-none");
    }


    

}

desplayCatigories();


window.onscroll = function(){
    const header = document.querySelector("header");
    const about = document.querySelector(".about");

    if (window.scrollY > about.offsetTop){
        header.classList.add("header-scrolled");
    }
    
    if (window.scrollY < about.offsetTop){
        header.classList.remove("header-scrolled");
    }
}
