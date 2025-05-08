import { ICategory } from "./categories";

export interface IProduct {
    id: number;
    nameProduct: string;
    price: number;
    priceDescription: string;
    image: string;
    stock: number;
    description: string;
    date: string;
    categories?: ICategory[];
    // sku?: string;
}

export interface IProductCart extends IProduct {
    quantity: number;
}



