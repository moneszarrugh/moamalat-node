import Moamalat from "../src";

const moamalat = new Moamalat();

async function loadTransaction() {
  const t = await moamalat.transactions("", {
    displayStart: 0,
    displayLength: 5,
  });

  console.log(t);

  console.log(t.Transactions[0].DateTransactions.length);
}

loadTransaction();
