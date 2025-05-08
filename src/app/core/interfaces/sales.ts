export interface ISales {
  totalSales: number;
  totalRevenue: number;
  productSales: { [nameProduct: string]: number }; // nome do produto e quantidade vendida
  productIdSales: { [id: number]: number }; // id do produto e quantidade vendida
}


