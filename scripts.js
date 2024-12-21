const convertButton = document.querySelector(".button");
const currencySelect = document.querySelector(".currency-select");

async function getExchangeRates() {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/BRL");
  const data = await response.json();

  return {
    dolar: data.rates.USD,
    euro: data.rates.EUR,
    bitcoin: data.rates.BTC || 1 / data.rates.USD, // Caso o valor do BTC esteja disponível
    libra: data.rates.GBP,
  };
}

async function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert"
  );
  const currencyValueConverted = document.querySelector(".currency-value");

  const todayRates = await getExchangeRates();

  const currencyFormats = {
    dolar: { locale: "en-US", currency: "USD" },
    euro: { locale: "de-DE", currency: "EUR" },
    bitcoin: { locale: "de-DE", currency: "BTC" },
    libra: { locale: "en-GB", currency: "GBP" },
  };

  const currency = currencyFormats[currencySelect.value];

  currencyValueConverted.innerHTML = new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.currency,
  }).format(inputCurrencyValue / todayRates[currencySelect.value]);

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.querySelector(".currency-img");

  const currencyData = {
    dolar: { name: "Dólar Americano", img: "./assets/dolar.png" },
    euro: { name: "Euro", img: "./assets/euro.png" },
    bitcoin: { name: "Bitcoin", img: "./assets/bitcoin.png" },
    libra: { name: "Libra", img: "./assets/libra.png" },
  };

  const selectedCurrency = currencyData[currencySelect.value];
  currencyName.innerHTML = selectedCurrency.name;
  currencyImage.src = selectedCurrency.img;

  convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
