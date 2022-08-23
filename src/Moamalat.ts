import { createHmac } from "crypto";
import dayjs from "dayjs";

import { HashData, InstanceConfig, MoamalatConfig } from "./types";

class Moamalat {
  private merchantId: string;
  private terminalId: string;
  private secureKey: Buffer;

  constructor({ merchantId, terminalId, secureKey }: InstanceConfig) {
    this.merchantId = merchantId;
    this.terminalId = terminalId;
    this.secureKey = Buffer.from(secureKey, "hex");
  }

  /**
   * @param amount amount to be paid in LYD
   * @param reference marchant reference e.g. invoice id
   * @param date date of checkout, default is now
   */
  checkout(
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

    const hmac = createHmac("sha256", this.secureKey)
      .update(params.toString())
      .digest("hex");

    return hmac;
  }
}

export default Moamalat;
