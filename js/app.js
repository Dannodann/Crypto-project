const cryptoSelect = document.querySelector("#criptomonedas")
const coinSelect = document.querySelector("#moneda")
const form = document.querySelector("#formulario");
const result = document.querySelector("#resultado");

const objSearch = {
    moneda: '',
    criptomoneda: ''
}


// Promise

const cryptoGet =  cryptocoin => new Promise (resolve => {
    resolve(cryptocoin)
})


document.addEventListener("DOMContentLoaded", (  ) =>{
    criptoConsult();

    form.addEventListener("submit", submitForm)

    cryptoSelect.addEventListener("change", readvalue)
    coinSelect.addEventListener("change", readvalue)
}
 )

 function criptoConsult() {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

    fetch(url)
        .then ( reply => reply.json())
        .then ( rest => cryptoGet(rest.Data))
        .then ( cryptocoin => selectCrypto(cryptocoin))
 }

 function selectCrypto(cryptocoin) {
    cryptocoin.forEach(crypto => {
        const { FullName, Name } = crypto.CoinInfo;
        const option = document.createElement("option");
        option.value = Name;
        option.textContent = FullName;
        cryptoSelect.appendChild(option)
    });
 }

 function readvalue(e){
    objSearch[e.target.name] = e.target.value
    console.log(objSearch)
 }

 function submitForm(e){
    e.preventDefault();

    //Validate

const { moneda, criptomoneda} = objSearch

if (moneda === '' || criptomoneda === '') {
    showError("Both fields are required ")
    return
}

// Consult API
consultAPI()

 }

 function showError(msg) {
    cleanHTLM();

    const FoundError = document.querySelector('.error')

    if(!FoundError){
    const divMenssage = document.createElement('div');
    divMenssage.classList.add('error')

    divMenssage.textContent = msg;
    formulario.appendChild(divMenssage)

    setTimeout(() => {
        divMenssage.remove()
    }, 2000);

 }
}

function consultAPI() {
    const {moneda, criptomoneda} = objSearch
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    showSpinner()

    fetch(url)
    .then ( reply => reply.json())
    .then ( contization => {
        showCotizationHTML(contization.DISPLAY[criptomoneda][moneda])
    }
        )
    
}

function showCotizationHTML(cotization) {
    cleanHTLM();

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotization
   
    const price =document.createElement('p')
    price.classList.add('precio')
    price.innerHTML = `Actual price is: <span>${PRICE}</span>`
    
    const priceHigh = document.createElement('p')
    priceHigh.innerHTML = `<p>High Price of Today: <span>${HIGHDAY}</span> <p>`

    const priceLow = document.createElement('p')
    priceLow.innerHTML = `<p>Low Price of Today: <span>${LOWDAY}</span> <p>`

    const LastHours = document.createElement('p')
    LastHours.innerHTML = `<p> 24 hrs Price variation: <span>${CHANGEPCT24HOUR}</span>% <p>`

    const LastAct = document.createElement('p')
    LastAct.innerHTML = `<p> Last Actualization: <span>${LASTUPDATE}</span><p>`

    result.appendChild(price)
    result.appendChild(priceHigh)
    result.appendChild(priceLow)
    result.appendChild(LastHours)
    result.appendChild(LastAct)
}

function cleanHTLM() {
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}
function showSpinner() {
    cleanHTLM();
    const spinner = document.createElement('div');

    spinner.innerHTML = `
    <div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
    </div>
    `;

    result.appendChild(spinner)
}