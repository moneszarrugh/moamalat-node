# Moamalat Node.js

The Moamalat node library makes it super simple to write the server-side code of the checkout proccess for the Moamalat payment gateway.

## Installation

npm

```sh
npm install moamalat
```

yarn

```sh
yarn add moamalat
```

## Import

ES Modules

```ts
import Moamalat from "moamalat";
```

CommonJS

```ts
const Moamalat = require("moamalat").default;
```

## Usage

#### Library usage on your node app

```ts
// configure your moamalat instance with your credentials
const moamalat = new Moamalat({
  merchantId: "your merchantId",
  terminalId: "your terminalId",
  secureKey: "your secureKey",
  prod: true,
});

// for testing, your don't need to configure anything
const moamalat = new Moamalat();

// example invoice
const invoice = {
  id: 1,
  amount: 100,
  date: new Date(),
};

// use the data from the invoice for checkout
const mycheckout = moamalat.checkout(
  invoice.amount, // required
  invoice.id, // optional
  invoice.date // optional
);

console.log(mycheckout);
```

```sh
# mycheckout
{
    MID: 'your merchantId',
    TID: 'your terminalId',
    AmountTrxn: 100000,
    MerchantReference: '1',
    TrxDateTime: '202208232306',
    SecureHash: '040654be3e74c6fe6ae873b84e94553e0cfb385431edcfe7a975312ead0f5849'
  }
```

#### Request the checkout data from the browser

```ts
const openPaymentGateway = async () => {
  // @ts-ignore
  const Lightbox = window.Lightbox;

  const invoice = {
    id: 1,
    amount: 100,
    date: new Date(),
  };

  // put your checkout logic in a handler and request it
  const res = await fetch("http://localhost:5000/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });

  const mycheckout = await res.json();

  mycheckout.completeCallback = (data) => {
    // code runs when payment is completed
    Lightbox.Checkout.closeLightbox();
  };

  mycheckout.cancelCallback = (data) => {
    // code runs when user cancels
  };

  mycheckout.errorCallback = (error) => {
    // code runs on error
  };

  // set the checkout configuration
  Lightbox.Checkout.configure = mycheckout;

  // show the payment dialog to the user
  Lightbox.Checkout.showLightbox();
};
```

#### Query transactions

```ts
// query by reference
const t = await moamalat.transactions("");

// optionally pass filtering options
const t = await moamalat.transactions("206", {
  displayStart: 0, // default is 0
  displayLength: 1, // default is 1
  dateFrom: new Date(),
  dateTo: new Date(),
});

console.log(t);
```

```bash
{
  Message: null,
  Success: true,
  TotalAmountAllTransaction: 105536115,
  TotalAmountTipsTransaction: 0,
  TotalCountAllTransaction: 713,
  Transactions: [
    {
      Date: '25/08/2022',
      DateTotalAmount: '17000',
      DateTransactions: [Array]
    }
  ]
}
```
