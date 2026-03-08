export interface EurUsdTrade {
    e: "trade";
    E: number;
    s: string;
    t: number;
    p: string; // prix (string côté Binance)
    q: string; // quantité (string côté Binance)
    b: number;
    a: number;
    T: number;
    m: boolean;
    M: boolean;
}