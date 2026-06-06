
const zapisanyKoszyk= localStorage.getItem('koszykSklepowy');
let koszyk = zapisanyKoszyk ? JSON.parse(zapisanyKoszyk) : [];
const kontenerKoszyka = document.getElementById("cart-items-container");
const cenaCalkowita = document.getElementById("cart-total-price");

function wyswietlKoszyk(){
    kontenerKoszyka.innerHTML ='';
    let suma=0;
    
    koszyk.forEach(item => {
        const cenaZawszystko=item.price*item.ilosc;
        suma+=cenaZawszystko;

        const szablon = `
        <div class="cart-item">
            <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name} <span style="color: #888;">(x${item.ilosc})</span></h3>
                <span class="cart-item-size">${item.size}</span>
                <span class="cart-item-price">$${cenaZawszystko.toFixed(2)}</span>
            </div>
        </div>`;
        kontenerKoszyka.insertAdjacentHTML("beforeend",szablon);
    });
    cenaCalkowita.innerText=`$${suma.toFixed(2)}`;
}
wyswietlKoszyk();

document.getElementById('order-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const imie = document.getElementById('first-name').value;
    localStorage.removeItem("koszykSklepowy");
    alert(`Dziękujemy ${imie}! Zamówienie zostało złożone pomyślnie`);
    window.location.href = "index.html"

})