export type InstanceConfig = {
  merchantId: string;
  terminalId: string;
  secureKey: string;
  prod?: boolean;
};

export type MoamalatConfig = {
  MID: string;
  TID: string;
  MerchantReference: string;
  AmountTrxn: number;
  TrxDateTime: string;
  SecureHash: string;
};

export type CheckoutHashData = {
  MerchantId: string;
  TerminalId: string;
  MerchantReference: string;
  Amount: string;
  DateTimeLocalTrxn: string;
};

export type FilterTransactionsHashData = {
  MerchantId: string;
  TerminalId: string;
  DateTimeLocalTrxn: string;
};

export type HashData = CheckoutHashData | FilterTransactionsHashData;

export interface TransactionsFilterOptions {
  displayLength: number;
  displayStart: number;
  dateFrom: Date | string;
  dateTo: Date | string;
  sortCol: string;
  sortDir: "asc" | "desc";
}

export interface TransactionResponse {
  Message: string | null;
  Success: boolean;
  TotalAmountAllTransaction: number;
  TotalAmountTipsTransaction: number | null;
  TotalCountAllTransaction: number;
  Transactions: Transaction[];
}

export interface Transaction {
  Date: string;
  DateTotalAmount: string;
  DateTransactions: DateTransaction[];
}

export interface DateTransaction {
  Amnt: string;
  AmountTrxn: string;
  AuthCode?: any;
  CardNo: string;
  CardType: string;
  Currency: string;
  ExternalTxnId?: any;
  FeeAmnt: string;
  HasToken: boolean;
  ISForceSendCVCForRefund: boolean;
  IsMustVoidTotalAmount: boolean;
  IsPointTrasnaction: boolean;
  IsRefund: boolean;
  IsRefundEnabled: boolean;
  IsSend: boolean;
  MerchantReference: string;
  MobileNumber?: any;
  OriginalTxnId: string;
  RRN: string;
  ReceiptNo: string;
  RefundButton: number;
  RefundReason: string;
  RefundSource: string;
  RefundUserCreator: string;
  RelatedTxnTotalAmount?: any;
  RemainingRefundAmount: string;
  ResCodeDesc: string;
  STAN: string;
  SenderName: string;
  Status: "Approved" | "Declined";
  TipAmnt: string;
  TransType: string;
  TransactionChannel: string;
  TransactionId: string;
  TxnDateTime: string;
  TxnIcon: number;
}
