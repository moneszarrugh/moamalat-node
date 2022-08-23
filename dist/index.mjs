// src/Moamalat.ts
import { createHmac } from "crypto";
import dayjs from "dayjs";
var Moamalat = class {
  constructor({ merchantId, terminalId, secureKey }) {
    this.merchantId = merchantId;
    this.terminalId = terminalId;
    this.secureKey = Buffer.from(secureKey, "hex");
  }
  checkout(amount, reference = "", date = new Date()) {
    const dateTime = dayjs(date).format("YYYYMMDDHHmm");
    return {
      MID: this.merchantId,
      TID: this.terminalId,
      AmountTrxn: amount * 1e3,
      MerchantReference: reference,
      TrxDateTime: dateTime,
      SecureHash: this.generateSecureHash(amount, reference, dateTime)
    };
  }
  generateSecureHash(amount, reference, dateTime) {
    const data = {
      MerchantId: this.merchantId,
      TerminalId: this.terminalId,
      Amount: (amount * 1e3).toString(),
      DateTimeLocalTrxn: dateTime,
      MerchantReference: reference
    };
    const params = new URLSearchParams(data);
    params.sort();
    const hmac = createHmac("sha256", this.secureKey).update(params.toString()).digest("hex");
    return hmac;
  }
};
var Moamalat_default = Moamalat;

// src/index.ts
var src_default = Moamalat_default;
export {
  src_default as default
};
