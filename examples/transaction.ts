import Moamalat from "../src";

const moamalat = new Moamalat();

async function loadTransaction() {
  const t = await moamalat.transactions("206", {
    displayStart: 0,
    displayLength: 1,
    dateFrom: new Date(),
    dateTo: new Date(),
  });

  console.log(t);

  console.log(t.Transactions[0].DateTransactions.length);
}

loadTransaction();
