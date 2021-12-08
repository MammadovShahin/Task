let addbasket = document.querySelectorAll('.btn');
function createBasketStorage() {
    if (!localStorage.getItem("basket")) {
        localStorage.setItem("basket", JSON.stringify([]));
    }
}
createBasketStorage();

function basketCount() {
    document.querySelector('sup').innerText = JSON.parse(localStorage.getItem("basket")).length;
}
addbasket.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        let Id = item.parentElement.parentElement.dataset.id;
        prName = item.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        img = item.parentElement.previousElementSibling.src;
        price = item.previousElementSibling.innerText;
        description = item.previousElementSibling.previousElementSibling.innerText;
        count = 1;
        createBasketStorage();
        let basket = getBasket(Id, prName, img, price, description)
        localStorage.setItem("basket", JSON.stringify(basket));
        basketCount();
    })
});
function getBasket(Id, prName, img, price, description) {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let existBasket = basket.find(item => item.id == Id);
    if (existBasket == undefined) {
        basket.push({
            id: Id,
            PrName: prName,
            Img: img,
            Price: price,
            Description: description,
            count: 1
        })
    } else {
        existBasket.count++;
    }
    return basket;
}
function myFunction(){
    let basketItems = JSON.parse(localStorage.getItem("basket"));
    if(basketItems.length!=0){
        basketItems.forEach(item=>{
            let tbody= document.querySelector('tbody');
                let tRow = document.createElement('tr');
                let timage = document.createElement("td")
                let imgr = document.createElement("img")
                timage.appendChild(imgr)
                imgr.setAttribute("src",item.Img)
                imgr.style.width ="50px";
                let tTittle = document.createElement('td');
                let tDescription = document.createElement('td');
                let tPrice = document.createElement('td');
                let tCount = document.createElement('td');
                let Delete = document.createElement('button');
                Delete.innerText="Delete";
                Delete.setAttribute('class','btnrow')
                let tDelete = document.createElement('td');
                tDelete.appendChild(Delete);
                tTittle.innerText = item.PrName;
                tDescription.innerText = item.Description;
                tPrice.innerText = item.Price;
                tCount.innerText=item.count;
                tRow.appendChild(tTittle);
                tRow.appendChild(tDescription);
                tRow.appendChild(timage);
                tRow.appendChild(tPrice);
                tRow.appendChild(tCount);
                tRow.appendChild(tDelete);
                tbody.appendChild(tRow);
                
            })
    }else{
        let basketclass = document.querySelector('.Main');
        basketclass.style.display = "flex";
    }
    
    let Deletebtn = document.querySelectorAll(".btnrow");
    console.log(Deletebtn)  

    Deletebtn.forEach(item => {
    item.addEventListener('click',function() {
        item.closest("tr").remove();
        let basket =JSON.parse(localStorage.getItem("basket"));
        if(basket.filter((x)=>x.id==item.parentElement.parentElement.id))
        {
            basket.splice(0,1);
            localStorage.setItem("basket", JSON.stringify(basket));
            basketCount();
        }
    })
})

}



