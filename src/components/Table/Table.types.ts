export interface Payment {
    id: number,
    amount: number,
    country: string,
    currency: string, 
    date: string,
    orderId: string,
    taxCode?: number,
    taxRate?: number,
    type?: string
}
