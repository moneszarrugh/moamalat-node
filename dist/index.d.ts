declare type InstanceConfig = {
    merchantId: string;
    terminalId: string;
    secureKey: string;
    prod?: boolean;
};
declare type MoamalatConfig = {
    MID: string;
    TID: string;
    MerchantReference: string;
    AmountTrxn: number;
    TrxDateTime: string;
    SecureHash: string;
};
interface TransactionsFilterOptions {
    displayLength: number;
    displayStart: number;
    dateFrom: Date | string;
    dateTo: Date | string;
    sortCol: string;
    sortDir: "asc" | "desc";
}
interface TransactionsResponse {
    Message: string | null;
    Success: boolean;
    TotalAmountAllTransaction: number;
    TotalAmountTipsTransaction: number | null;
    TotalCountAllTransaction: number;
    Transactions: Transaction[];
}
interface Transaction {
    Date: string;
    DateTotalAmount: string;
    DateTransactions: DateTransaction[];
}
interface DateTransaction {
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

declare class Moamalat {
    private merchantId;
    private terminalId;
    private secureKey;
    private apiUrl;
    constructor({ merchantId, terminalId, secureKey, prod, }?: InstanceConfig);
    /**
     * @param amount amount to be paid in LYD
     * @param reference marchant reference e.g. invoice id
     * @param date date of checkout, default is now
     */
    checkout(amount: number, reference?: string | number, date?: Date): MoamalatConfig;
    transactions(reference: string | number, optoins?: Partial<TransactionsFilterOptions>): Promise<TransactionsResponse>;
    private generateSecureHash;
}

export { MoamalatConfig, TransactionsFilterOptions, TransactionsResponse, Moamalat as default };
