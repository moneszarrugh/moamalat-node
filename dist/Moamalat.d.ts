import { InstanceConfig, MoamalatConfig } from "./types.js";
declare class Moamalat {
    private merchantId;
    private terminalId;
    private secureKey;
    constructor(config: InstanceConfig);
    checkoutConfig(amount: number, reference?: string, date?: Date): MoamalatConfig;
    private generateSecureHash;
}
export default Moamalat;
