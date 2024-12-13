let bar = document.getElementById("bar");
let nav = document.getElementById("navbar");
let close = document.getElementById("close");
let page1 = document.getElementById("pg1");
let page2 = document.getElementById("pg2");
let cont = document.getElementById("cont");


if(bar){
    bar.addEventListener("click", () =>{
        nav.classList.add("active");
        console.log("Working...")
    });
};

if(close){
    close.addEventListener("click", ()=>{
        nav.classList.remove("active");

    })
}

page1.onclick = ()=>{
    page1.classList.add("active");
    page2.classList.remove("active");
}

page2.onclick = ()=>{
    page1.classList.remove("active");
    page2.classList.add("active");
}

cont.onclick = ()=>{
    page1.classList.remove("active");
    page2.classList.add("active");
}

function link(){
    window.location.href = "sproducts.html";
    console.log("It works");
}