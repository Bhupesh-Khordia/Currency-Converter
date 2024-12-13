const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";


let from = document.querySelector("#from");
let to = document.querySelector("#to");



// To load all currecies in dropdown
for (currencyCode in countryList) {
    let el1 = document.createElement("option");
    let el2 = document.createElement("option");
    el1.innerText = currencyCode;
    el2.innerText = currencyCode;
    el1.value = currencyCode;
    el2.value = currencyCode;
    if(currencyCode === "USD") el1.selected = true;
    if(currencyCode === "INR") el2.selected = true;
    from.append(el1);
    to.append(el2);
}


// To change flag when a new country is selected
let select_img = document.querySelectorAll("img");

from.addEventListener("change", (evt) => {
    select_img[0].src = `https://flagsapi.com/${countryList[evt.target.value]}/shiny/64.png`;
});
to.addEventListener("change", (evt) => {
    select_img[1].src = `https://flagsapi.com/${countryList[evt.target.value]}/shiny/64.png`;
});;


// Currency convert
let btn = document.querySelector("#btn");
let input = document.querySelector("input");
let msg = document.querySelector("#msg");

async function updateMessage () {
    const URL = `${baseURL}${from.value.toLowerCase()}.json`;
    let response = await fetch (URL);
    let data = await response.json();
    let fromVal = from.value.toLowerCase();
    let toVal = to.value.toLowerCase();
    let rate = data[fromVal][toVal];
    
    let amt = input.value; 
    if(amt < 0 || amt === "") {
        amt = 1;
        input.value = 1;
    }
    
    let total = amt * rate;
    msg.innerText = `${amt} ${from.value} = ${total} ${to.value}`;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    
    updateMessage();
});


// Chenge values when program load.
window.addEventListener("load", () => {
    updateMessage();
});