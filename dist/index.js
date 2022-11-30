"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/Moamalat.ts
var import_crypto = require("crypto");
var import_dayjs = __toESM(require("dayjs"));
var import_node_fetch = __toESM(require("node-fetch"));

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
    const dateTime = (0, import_dayjs.default)(date).format("YYYYMMDDHHmm");
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
  async transactionApproved(reference) {
    var _a;
    const transactions = await this.transactions(reference);
    let approved = false;
    if ((_a = transactions.Transactions) == null ? void 0 : _a.length) {
      approved = transactions.Transactions[0].DateTransactions[0].Status === "Approved";
    }
    return approved;
  }
  async transactions(reference, optoins = {}) {
    const hashData = {
      MerchantId: this.merchantId,
      TerminalId: this.terminalId,
      DateTimeLocalTrxn: (0, import_dayjs.default)().format("YYYYMMDDHHmmss")
    };
    const {
      displayLength = 1,
      displayStart = 0,
      dateFrom,
      dateTo,
      sortCol,
      sortDir
    } = optoins;
    const body = {
      ...hashData,
      MerchantReference: reference == null ? void 0 : reference.toString(),
      DisplayLength: displayLength,
      DisplayStart: displayStart,
      DateFrom: dateFrom && (0, import_dayjs.default)(dateFrom).format("YYYYMMDD"),
      DateTo: dateTo && (0, import_dayjs.default)(dateTo).format("YYYYMMDD"),
      SortCol: sortCol,
      SortDir: sortDir,
      SecureHash: this.generateSecureHash(hashData)
    };
    const res = await (0, import_node_fetch.default)(
      this.apiUrl + "/cube/paylink.svc/api/FilterTransactions",
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
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
    const hmac = (0, import_crypto.createHmac)("sha256", key).update(data).digest("hex");
    return hmac;
  }
};
var Moamalat_default = Moamalat;

// src/index.ts
var src_default = Moamalat_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
