import { IProduct } from "./products";

export interface ICategory {
  id?: number;
  nameCategory?: string;
  createdAt?: Date;
  updatedAt?: Date;
  iconClass?: string;
  products?: IProduct[]; // Optional property to hold related products
}


