/**
 * Rewrite the definition of window to add the potentially present `ethereum` and `web3` objects.
 */
export declare var window: Window & {
    ethereum?: {
        enable: () => Promise<void>;
    };
    web3?: object;
}
