import Moamalat from "../src";

const moamalat = new Moamalat();

async function loadTransaction() {
  const t = await moamalat.transactions("206", {
    displayStart: 0, // default is 0
    displayLength: 1, // default is 1
    dateFrom: new Date(2022, 0, 1),
    dateTo: "2022-08-28T00:34:40.974Z", // ISO 8601 format is also supported
  });

  console.log(t);

  console.log(t.Transactions[0].DateTransactions.length);
}

loadTransaction();
