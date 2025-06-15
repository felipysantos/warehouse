export class CreateServiceOrderDto {
  requester: string;
  products: {
    productId: number;
    requestedQuantity: number;
  }[];
}
