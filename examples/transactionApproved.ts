import Moamalat from "../src";

const moamalat = new Moamalat();

(async function () {
  try {
    const approved = await moamalat.transactionApproved(243);

    console.log({ approved });

    if (approved) {
      //     update invoice status to paid and send confirmation to customer
    }
  } catch (error) {
    console.error((error as Error).message);
  }
})();
