import Moamalat from "../src";

const moamalat = new Moamalat();

async function loadTransaction() {
  const t = await moamalat.transactions("");

  console.log(t);

  console.log(t.Transactions[0].DateTransactions.length);
}

loadTransaction();
