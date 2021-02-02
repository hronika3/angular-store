export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Product {
  id?: string
  title: string
  category: string
  text: string
  cost: string
  image?: string
}

export interface FbCreateResponse {
  name: string
}
