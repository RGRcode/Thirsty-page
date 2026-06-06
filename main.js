const produkty = [
    {
        id: 1,
        name: "Black",
        price: 3.00,
        size: "250ml",
        image: "img/black.jpg"
    },
    {
        id: 2,
        name: "Coca Cola",
        price: 2.00,
        size: "330ml",
        image: "img/cola.jpg"
    },
    {
        id: 3,
        name: "Coca Cola Zero",
        price: 2.00,
        size: "330ml",
        image: "img/cola_zero.jpg"
    },
    {
        id: 4,
        name: "Dzik Grape",
        price: 4.00,
        size: "500ml",
        image: "img/dzikgrape.jpg"
    },
    {
        id: 5,
        name: "Fanta",
        price: 2.20,
        size: "330ml",
        image: "img/fanta.jpg"
    },
    {
        id: 6,
        name: "Mountain Dew",
        price: 2.50,
        size: "330ml",
        image: "img/mountain.jpg"
    },
    {
        id: 7,
        name: "Pepsi",
        price: 2.00,
        size: "330ml",
        image: "img/pepsi.jpg"
    },
    {
        id: 8,
        name: "Pepsi Zero",
        price: 2.00,
        size: "330ml",
        image: "img/pepsi_zero.jpg"
    },
    {
        id: 9,
        name: "Red Bull",
        price: 3.50,
        size: "250ml",
        image: "img/redbull.jpg"
    },
    {
        id: 10,
        name: "Red Bull Zero",
        price: 3.50,
        size: "250ml",
        image: "img/redbull_zero.jpg"
    }
];
const zapisanyKoszyk = localStorage.getItem("koszykSklepowy");
let koszyk= zapisanyKoszyk ? JSON.parse(zapisanyKoszyk) : [];

const przyciskDodawania = document.querySelectorAll('.add-to-cart-btn');
const kontenerKoszyka = document.getElementById('cart-items-container');
const Cenacalkowita = document.getElementById('cart-total-price');
odswiezWidokKoszyka();


przyciskDodawania.forEach(przycisk => {
    przycisk.addEventListener('click',(event)=>{
       const produktId= parseInt(event.target.dataset.id);
       dodajDoKoszyka(produktId) 
    })
});

function dodajDoKoszyka(idProduktu){
    const istniejacyProdukt = koszyk.find(item => item.id === idProduktu);
    if(istniejacyProdukt){
        istniejacyProdukt.ilosc +=1;
    }
    else{
        const znalezionyProdukt = produkty.find(p => p.id === idProduktu);
        koszyk.push({
            ...znalezionyProdukt,
            ilosc:1
        });
    }
    console.log(`aktualny stan koszyka w pamieci: ${koszyk}`);
    odswiezWidokKoszyka();
}

kontenerKoszyka.addEventListener('click',(event) =>{
    const przyciskUsuwania = event.target.closest('.cart-item-remove')
    if (przyciskUsuwania){
        const doUsuniecia = parseInt(przyciskUsuwania.dataset.id);
        const produktwkoszyku = koszyk.find(item => item.id === doUsuniecia);
        if(produktwkoszyku){
            produktwkoszyku.ilosc-=1;
            if(produktwkoszyku.ilosc<=0){
                koszyk = koszyk.filter(item => item.id !== doUsuniecia);
            }
        }
        odswiezWidokKoszyka();
    }
});


function odswiezWidokKoszyka(){
    kontenerKoszyka.innerHTML='';
    let suma=0;
    koszyk.forEach(item => {
        const cenaZaWszystko = item.price*item.ilosc;
        suma += cenaZaWszystko;

        const szablon=
       ` <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name} <span style="color: #888;">(x${item.ilosc})</span></h3>
                    <span class="cart-item-size">${item.size}</span>
                    <span class="cart-item-price">$${cenaZaWszystko.toFixed(2)}</span>
                </div>
                <button class="cart-item-remove" data-id="${item.id}" aria-label="Usuń z koszyka">&times;</button>
            </div>`;
            kontenerKoszyka.insertAdjacentHTML('beforeend',szablon);
        
    });
    Cenacalkowita.innerText=`$${suma.toFixed(2)}`;
}

const przyciskZamow = document.querySelector('.order-btn');
przyciskZamow.addEventListener('click', () => {
    if (koszyk.length === 0){
        alert("Twoj koszyk jest pusty");
        return;
    }
    localStorage.setItem('koszykSklepowy',JSON.stringify(koszyk));
    window.location.href = "formularz.html";
});


