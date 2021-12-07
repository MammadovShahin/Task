let addbasket = document.querySelectorAll('.btn');
function createBasketStorage(){
    if(!localStorage.getItem("basket")){
        localStorage.setItem("basket", JSON.stringify([]));
    }
}
createBasketStorage();
function basketCount(){
    document.querySelector('sup').innerText=JSON.parse(localStorage.getItem("basket")).length;
}
basketCount();
addbasket.forEach(item=>{
    item.addEventListener("click", (e)=>{
        e.preventDefault();
        let Id = item.parentElement.parentElement.dataset.id;
            prName=item.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
            img= item.parentElement.previousElementSibling.src;
            price= item.previousElementSibling.innerText;
            description=item.previousElementSibling.previousElementSibling.innerText;
            count=1;
            createBasketStorage();
            let basket = getBasket(Id, prName, img, price, description)
            localStorage.setItem("basket",JSON.stringify(basket));
            basketCount();
         })
});
function getBasket(Id, prName, img, price, description){
    let basket = JSON.parse(localStorage.getItem("basket"));
    let existBasket=basket.find(item=>item.id==Id);
    if(existBasket==undefined){
        basket.push({
            id:Id,
            PrName:prName,
            Img:img,
            Price:price,
            Description:description,
            count:1
        })
    }else{
        existBasket.count++;
    }
    return basket;
}

