const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
const closer = document.getElementById("closer");
const cont = document.getElementById("cont");
const ckt = document.getElementById("ckt");
const ckt2 = document.getElementById("items");
const cart = document.getElementById("cart");
const span = document.getElementById("span");
 
let products = [];
let shoppingCart = [];

function tog(){
    nav.classList.toggle("active");
    console.log("Working...");
};


function link(){
    window.location.href = "sproducts.html";
    console.log("It works");
}

function closer1(){
    ckt.classList.toggle("checkout");
    console.log("OK");
}

function create(){
    cart.innerHTML = "";
    if(products.length > 0){
        products.forEach(
            products=>{
                let newProduct = document.createElement("div");
                newProduct.classList.add("card");
                newProduct.dataset.id = products.id;
                newProduct.innerHTML = `<div class="img">
                <img src="${products.image}" alt="Image" >
            </div>
            <h3>${products.name}</h3>
            <p>This is a White Gucci Bag</p>
            <p>${products.price}</p>
            <button id="btn" class="x">Add To Cart</button>`;
            cart.appendChild(newProduct);
            }
        ) 
    }
}

function addToCart(product_id){
    let positionProduct = shoppingCart.findIndex((value)=> value.product_id == product_id)
    if (shoppingCart.length <= 0) {
        shoppingCart = [{
          product_id: product_id,
          quantity: 1  
        }]
    }else if (positionProduct < 0){
        shoppingCart.push({
            product_id: product_id,
            quantity: 1
        })
    }else{
        shoppingCart[positionProduct].quantity = shoppingCart[positionProduct].quantity + 1;
    }
    addCartToHtml();
    addCartToMemory();
}

function addCartToMemory(){
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
}

function addCartToHtml(){
    ckt2.innerHTML = "";
    let totalQuantity = 0;
    if (shoppingCart.length > 0){
        shoppingCart.forEach(
            cart =>{
                let newCart = document.createElement("div");
                totalQuantity = totalQuantity + cart.quantity;
                newCart.classList.add("item");
                let positionProduct = products.findIndex((value)=>value.id == cart.product_id);
                let info = products[positionProduct];
                newCart.innerHTML = `<div class="img"><img src="${info.image}" alt=""></div>
                <div class="name">${info.name}</div>
                <div class="price">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>`;
                ckt2.appendChild(newCart);
            }

        )
    }
    span.innerText = totalQuantity;
}

ckt2.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("minus")|| positionClick.classList.contains("plus")){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = "minus";
        if(positionClick.classList.contains("plus")){
            type = "plus";
        }
        changeQuantity(product_id, type);
    }
})

function changeQuantity(product_id, type){
    let positionItemInCart = shoppingCart.findIndex((value)=>value.product_id == product_id)

    if (positionItemInCart >= 0){
        switch (type) {
            case plus:
                shoppingCart[positionItemInCart].quantity = shoppingCart[positionItemInCart].quantity +1;
                break;
        
            default:
                let valueChange = shoppingCart[positionItemInCart].quantity - 1;
                if(valueChange > 0){
                    shoppingCart[positionItemInCart].quantity = valueChange;
                }else{
                    shoppingCart.splice(positionItemInCart, 1)
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHtml();
}

cart.addEventListener("click", (event)=>{
    let position = event.target;
    if(position.classList.contains("x")){
        let product_id = position.parentElement.dataset.id;
        addToCart(product_id);
    }
})


function initApp() {
    fetch("products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        create();
            if (localStorage.getItem("cart")){
                shoppingCart = JSON.parse(localStorage.getItem("cart"));
                addCartToHtml();
            }
    })
}

initApp()
