
export interface IOrder {
  id: number;
  items: IOrderItem[];
  moment: Date;
  status: string;
}

export interface IOrderItem {
  productId: number;
  quantity: number;
  price: number;
}


