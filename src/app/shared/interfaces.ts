export interface User {
    id?: string;
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface LoginUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    roles?: Roles;
}

export interface CustomerData {
    firstName: string;
    lastName: string;
    address: string;
}

export interface Roles {
    admin?: boolean;
    user?: boolean;
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface UserCart {
    productId: string
}

export interface Product {
    id?: string;
    title: string;
    category: string;
    text: string;
    cost: string;
    image: string;
    cartId?: string;
}

export interface FbCreateResponse {
    name: string;
}

export interface Order {
    uid: string;
    id?: string;
    products: any;
    firstName: string;
    lastName: string;
    address: string;
}
