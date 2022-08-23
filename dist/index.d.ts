declare type InstanceConfig = {
    merchantId: string;
    terminalId: string;
    secureKey: string;
};
declare type MoamalatConfig = {
    MID: string;
    TID: string;
    MerchantReference: string;
    AmountTrxn: number;
    TrxDateTime: string;
    SecureHash: string;
};

declare class Moamalat {
    private merchantId;
    private terminalId;
    private secureKey;
    constructor({ merchantId, terminalId, secureKey }: InstanceConfig);
    /**
     * @param amount amount to be paid in LYD
     * @param reference marchant reference e.g. invoice id
     * @param date date of checkout, default is now
     */
    checkout(amount: number, reference?: string, date?: Date): MoamalatConfig;
    private generateSecureHash;
}

export { Moamalat as default };
