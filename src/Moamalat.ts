import { createHmac } from "crypto";
import dayjs from "dayjs";

import { HashData, InstanceConfig, MoamalatConfig } from "./types";

class Moamalat {
  private merchantId: string;
  private terminalId: string;
  private secureKey: string;

  constructor(config: InstanceConfig) {
    this.merchantId = config.merchantId;
    this.terminalId = config.terminalId;
    this.secureKey = config.secureKey;
  }

  checkoutConfig(
    amount: number,
    reference: string = "",
    date: Date = new Date()
  ): MoamalatConfig {
    const dateTime = dayjs(date).format("YYYYMMDDHHmm");

    return {
      MID: this.merchantId,
      TID: this.terminalId,
      AmountTrxn: amount * 1000,
      MerchantReference: reference,
      TrxDateTime: dateTime,
      SecureHash: this.generateSecureHash(amount, reference, dateTime),
    };
  }

  private generateSecureHash(
    amount: number,
    reference: string,
    dateTime: string
  ) {
    const data: HashData = {
      MerchantId: this.merchantId,
      TerminalId: this.terminalId,
      Amount: (amount * 1000).toString(),
      DateTimeLocalTrxn: dateTime,
      MerchantReference: reference,
    };

    const params = new URLSearchParams(data);

    params.sort();

    const key = Buffer.from(this.secureKey, "hex");

    const hmac = createHmac("sha256", key)
      .update(params.toString())
      .digest("hex");

    return hmac;
  }
}

export default Moamalat;
