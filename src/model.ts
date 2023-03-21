export interface LocalPaymentMethod {
    image?: string
    label: string
    name?: string
    provider: string
}

export interface RemotePaymentMethod {
    users: Array<any>
}