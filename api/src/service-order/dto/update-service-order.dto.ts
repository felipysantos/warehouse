import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceOrderDto } from './create-service-order.dto';

export class UpdateServiceOrderDto extends PartialType(CreateServiceOrderDto) {
  requester?: string;
  orderNumber?: string;
  products?: {
    productId: number;
    requestedQuantity: number;
  }[];
}
