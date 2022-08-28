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
  try {
    const approved = await moamalat.transactionApproved(reference);

    console.log({ approved });

    if (approved) {
      //     update invoice status to paid and send confirmation to customer
    }
  } catch (error) {
    console.error((error as Error).message);
  }
}
