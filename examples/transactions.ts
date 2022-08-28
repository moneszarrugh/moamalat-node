import Moamalat from "../src";
import { Reference } from "../src/types";

const moamalat = new Moamalat();

(async function () {
  await test(206);

  await new Promise((resolve) => setTimeout(() => resolve(test(243)), 1000));

  await new Promise((resolve) =>
    setTimeout(() => resolve(test(9999999)), 1000)
  );

  test(9999999);
})();

async function test(reference: Reference) {
  console.log(await moamalat.transactions(reference));
}

async function example() {
  const transactions = await moamalat.transactions(206, {
    displayStart: 0, // default is 0
    displayLength: 1, // default is 1
    dateFrom: new Date(2022, 0, 1),
    dateTo: "2022-08-28T00:34:40.974Z", // ISO 8601 format is also supported
  });

  console.log(JSON.stringify(transactions, null, 3));
}
