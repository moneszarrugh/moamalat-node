// src/Moamalat.ts
import { createHmac } from "crypto";
import dayjs from "dayjs";
import fetch from "node-fetch";

// src/constants.ts
var testApiUrl = "https://tnpg.moamalat.net";
var prodApiUrl = "https://npg.moamalat.net";
var testConfig = {
  merchantId: "10081014649",
  terminalId: "99179395",
  secureKey: "39636630633731362D663963322D346362642D386531662D633963303432353936373431",
  prod: false
};

// src/Moamalat.ts
var Moamalat = class {
  constructor({
    merchantId,
    terminalId,
    secureKey = "",
    prod
  } = testConfig) {
    this.merchantId = merchantId;
    this.terminalId = terminalId;
    this.secureKey = secureKey;
    this.apiUrl = prod ? prodApiUrl : testApiUrl;
  }
  checkout(amount, reference = "", date = new Date()) {
    const dateTime = dayjs(date).format("YYYYMMDDHHmm");
    const _amount = amount * 1e3;
    const hashData = {
      MerchantId: this.merchantId,
      TerminalId: this.terminalId,
      Amount: _amount.toString(),
      DateTimeLocalTrxn: dateTime,
      MerchantReference: reference.toString()
    };
    return {
      MID: this.merchantId,
      TID: this.terminalId,
      AmountTrxn: _amount,
      MerchantReference: reference.toString(),
      TrxDateTime: dateTime,
      SecureHash: this.generateSecureHash(hashData)
    };
  }
  async transactions(reference = "", optoins = {}) {
    const hashData = {
      MerchantId: this.merchantId,
      TerminalId: this.terminalId,
      DateTimeLocalTrxn: dayjs().format("YYYYMMDDHHmmss")
    };
    const {
      displayLength = 1,
      displayStart = 0,
      dateFrom,
      dateTo,
      sortCol,
      sortDir
    } = optoins;
    const res = await fetch(
      this.apiUrl + "/cube/paylink.svc/api/FilterTransactions",
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          ...hashData,
          MerchantReference: reference.toString(),
          DisplayLength: displayLength,
          DisplayStart: displayStart,
          DateFrom: dateFrom && dayjs(dateFrom).format("YYYYMMDD"),
          DateTo: dateTo && dayjs(dateTo).format("YYYYMMDD"),
          SortCol: sortCol,
          SortDir: sortDir,
          SecureHash: this.generateSecureHash(hashData)
        })
      }
    );
    const data = await res.json();
    return data;
  }
  generateSecureHash(hashData) {
    const params = new URLSearchParams(hashData);
    params.sort();
    const data = params.toString();
    const key = Buffer.from(this.secureKey, "hex");
    const hmac = createHmac("sha256", key).update(data).digest("hex");
    return hmac;
  }
};
var Moamalat_default = Moamalat;

// src/index.ts
var src_default = Moamalat_default;
export {
  src_default as default
};
