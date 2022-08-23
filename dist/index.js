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
var Moamalat = class {
  constructor({ merchantId, terminalId, secureKey }) {
    this.merchantId = merchantId;
    this.terminalId = terminalId;
    this.secureKey = Buffer.from(secureKey, "hex");
  }
  checkout(amount, reference = "", date = new Date()) {
    const dateTime = (0, import_dayjs.default)(date).format("YYYYMMDDHHmm");
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
    const hmac = (0, import_crypto.createHmac)("sha256", this.secureKey).update(params.toString()).digest("hex");
    return hmac;
  }
};
var Moamalat_default = Moamalat;

// src/index.ts
var src_default = Moamalat_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
