

var products= fetch('https://fakestoreapi.com/products/')
.then(res=>res.json())
.then(data=>obj=data)
.then(()=>{
let carts = document.querySelectorAll('.add-chart');

for(let i=0; i<carts.length; i++){
   carts[i].addEventListener('click',()=>{
        cartNumbers(obj[i]);
        totalCost(obj[i]);
        
   })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
      document.querySelector('.num-cart-product1 span').textContent = productNumbers;
    }

}


function cartNumbers(product,action){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    }
    else if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.num-cart-product1 span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.num-cart-product1 span').textContent= 1;
    }
   setItems(product);
}

function setItems(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems !=null){
        let currentProduct = product.title;

        if (cartItems[product.title] != undefined) {
            cartItems = {
                ...cartItems,
                [product.title] : product
            }
        }
        cartItems[currentProduct].id += 1;
    }
    else{
        product.id = 1;
        cartItems ={
            [product.title]: product
        }
    }


    localStorage.setItem("productInCart",JSON.stringify(cartItems));
}

function totalCost(product){

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);

    if (cartCost !=null) {
        localStorage.setItem("totalCost",cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost",product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem('totalCost');
    cart= parseInt(cart);

    let productContainer = document.querySelector(".products");
    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item=>{
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <h3 id="${item.title}"> </h3>
                <span>${item.name}M/span>
                <div class="price">$${item.price},00</div>
                <div class="quantity">
                <ion-icon class="decrease"
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <div class="total">
               $${item.inCart *item.price},00
                </div>
            `;

        });
    }
}

onLoadCartNumbers();

});






