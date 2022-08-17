export type InstanceConfig = {
  merchantId: string;
  terminalId: string;
  secureKey: string;
};

export type HashData = {
  MerchantId: string;
  TerminalId: string;
  MerchantReference: string;
  Amount: string;
  DateTimeLocalTrxn: string;
};

export type MoamalatConfig = {
  MID: string;
  TID: string;
  MerchantReference: string;
  AmountTrxn: number;
  TrxDateTime: string;
  SecureHash: string;
};
