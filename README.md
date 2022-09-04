# Moamalat Node.js

The Moamalat node library makes it super simple and blazingly fast to write server-side code to interact with the Moamalat payment gateway and API.

Implemented in TypeScript with full type definitions for all your IntelliSense needs.

This library was based on [the official docs](http://docs.moamalat.net:55/lightbox.html).

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

## Usage & [Examples](https://github.com/moneszarrugh/moamalat-node/tree/main/examples)

### Library usage on your node app

Configure your moamalat instance with your credentials.

```ts
const moamalat = new Moamalat({
  merchantId: "your merchantId",
  terminalId: "your terminalId",
  secureKey: "your secureKey",
  prod: true,
});
```

For testing, your don't need to configure anything.

```ts
const moamalat = new Moamalat();
```

<br>

### Checkout

```ts
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

Prints

```json
{
  "MID": "10081014649",
  "TID": "99179395",
  "AmountTrxn": 100000,
  "MerchantReference": "1",
  "TrxDateTime": "202208280609",
  "SecureHash": "ece57701f40c0ef7b482e476b37118568c76d5d054243d244d5533c05e6c9ae3"
}
```

<br>

### Library usage on the browser

Request the checkout data using an http request to use with LightBox in the browser.

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

<br>

### Verify Payment

```ts
// pass checkout reference
// invoice id is 206 in this example
const approved = await moamalat.transactionApproved(206);

if (approved) {
  // update invoice status in your database to paid
  // send confirmation email to customer
}
```

<br>

### Query Transactions

Query One

```ts
// query by reference
const transaction = await moamalat.transactions(206);

console.log(transaction);
```

Query Many

```ts
// pass null reference with filtering options
const transactions = await moamalat.transactions(null, {
  displayStart: 0, // default is 0
  displayLength: 100, // default is 1
  dateFrom: new Date(2022, 0, 1),
  dateTo: "2022-08-28T00:34:40.974Z", // ISO 8601 format is also supported
});
```

Prints

```json
{
  "Message": null,
  "Success": true,
  "TotalAmountAllTransaction": 2200000,
  "TotalAmountTipsTransaction": 0,
  "TotalCountAllTransaction": 1,
  "Transactions": [
    {
      "Date": "04/08/2022",
      "DateTotalAmount": "2200000",
      "DateTransactions": [
        {
          "Amnt": "2200000",
          "AmountTrxn": "2200000",
          "AuthCode": null,
          "CardNo": "639499XXXXXX0781",
          "CardType": "",
          "Currency": "LYD",
          "ExternalTxnId": null,
          "FeeAmnt": "0",
          "HasToken": true,
          "ISForceSendCVCForRefund": true,
          "IsMustVoidTotalAmount": false,
          "IsPointTrasnaction": false,
          "IsRefund": false,
          "IsRefundEnabled": true,
          "IsSend": false,
          "MerchantReference": "206",
          "MobileNumber": null,
          "OriginalTxnId": "",
          "RRN": "221603323057",
          "ReceiptNo": "221603323057",
          "RefundButton": 0,
          "RefundReason": "",
          "RefundSource": "",
          "RefundUserCreator": "",
          "RelatedTxnTotalAmount": null,
          "RemainingRefundAmount": "2200000",
          "ResCodeDesc": "Approved",
          "STAN": "323057",
          "SenderName": "mones zarrugh",
          "Status": "Approved",
          "TipAmnt": "0",
          "TransType": "Sale",
          "TransactionChannel": "Card",
          "TransactionId": "1232907",
          "TxnDateTime": "04/08/22  03:46",
          "TxnIcon": 2
        }
      ]
    }
  ]
}
```
