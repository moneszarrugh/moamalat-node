import Moamalat from "../src";

/*
    get test data from: http://docs.moamalat.net:55/lightbox.html
*/

const moamalat = new Moamalat({
  merchantId: "your merchantId",
  terminalId: "your terminalId",
  secureKey: "your secureKey",
});

const invoice = {
  id: 1,
  amount: 100,
  date: new Date(),
};

const mycheckout = moamalat.checkout(
  invoice.amount,
  invoice.id.toString(),
  invoice.date
);

console.log(mycheckout);
