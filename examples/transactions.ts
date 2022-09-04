import Moamalat from "../src";
import { Reference } from "../src/types";

const moamalat = new Moamalat();

(async function () {
  // await test(206);

  // await new Promise((resolve) => setTimeout(() => resolve(test(243)), 1000));

  // await new Promise((resolve) =>
  //   setTimeout(() => resolve(test(9999999)), 1000)
  // );

  // test(9999999);

  example();
})();

async function test(reference: Reference) {
  console.log(await moamalat.transactions(reference));
}

async function example() {
  const transactions = await moamalat.transactions(null, {
    displayLength: 1000,
    dateFrom: new Date(2020, 0, 1),
    dateTo: new Date(),
  });

  console.log(transactions);
  console.log(transactions.Transactions?.length);

  // console.log(JSON.stringify(transactions, null, 3));
}
