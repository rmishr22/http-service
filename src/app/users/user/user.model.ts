export interface User{
    email: string,
    id: number,
    name: string,
    phone: string,
    username: string,
    website: string,
    address: Address,
    company: Company
}
export interface Company{
    bs: string,
    catchPhrase: string,
    name: string
}
export interface Address {
    city : string,
    geo: Geo,
    street: string,
    zipcode: string
    suite: string
}
export interface Geo{
    lat: string,
    lng : string
}

