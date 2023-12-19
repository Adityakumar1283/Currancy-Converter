const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const drop = document.querySelectorAll(".drop select");

const btn = document.querySelector("form button");

const fromcurr = document.querySelector(".from select");

const Tocurr = document.querySelector(".TO select");

const msg = document.querySelector(".msg");

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  for (let select of drop) {
    for (currcode in countryList) {
      let newoption = document.createElement("option");
      newoption.innerText = currcode;
      newoption.value = currcode;
      if (select.name === "from" && currcode === "USD") {
        newoption.selected = "selected";
      } else if (select.name === "To" && currcode === "INR") {
        newoption.selected = "selected";
      }
      select.append(newoption);
    }
    select.addEventListener("change", (evnt) => {
      updateflag(evnt.target);
    });
  }

  const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${Tocurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);

  let data = await response.json();
  let rate = data[Tocurr.value.toLowerCase()];

  let finalamount = amtval * rate;
  msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${Tocurr.value}`;
};
btn.addEventListener("click", (evnt) => {
  evnt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
