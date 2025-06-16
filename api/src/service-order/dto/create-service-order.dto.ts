export class CreateServiceOrderDto {
  requester: string;
  orderNumber: string;
  products: {
    productId: number;
    requestedQuantity: number;
  }[];
}
