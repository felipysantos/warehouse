import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';

@Injectable()
export class ServiceOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateServiceOrderDto) {
    const serviceOrder = await this.prisma.serviceOrder.create({
      data: {
        requester: data.requester,
      },
    });

    const noteItems = [];
    const orderItems = [];

    for (const item of data.products) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new BadRequestException(
          `Produto ${product.name} não encontrado!`,
        );
      }

      if (product.quantity >= item.requestedQuantity) {
        noteItems.push({
          serviceOrderId: serviceOrder.id,
          productId: item.productId,
          requestedQuantity: item.requestedQuantity,
        });

        await this.prisma.product.update({
          where: { id: item.productId },
          data: { quantity: product.quantity - item.requestedQuantity },
        });
      } else if (product.quantity > 0) {
        orderItems.push({
          serviceOrderId: serviceOrder.id,
          productId: item.productId,
          requestedQuantity: product.quantity,
        });

        await this.prisma.product.update({
          where: { id: item.productId },
          data: { quantity: 0 },
        });
      } else {
        throw new BadRequestException(`Produto ${product.name} sem estoque.`);
      }
    }

    if (noteItems.length > 0) {
      await this.prisma.serviceOrderProduct.createMany({
        data: noteItems,
      });
    }

    if (orderItems.length > 0) {
      await this.prisma.serviceOrderProduct.createMany({
        data: orderItems,
      });
    }

    return serviceOrder;
  }

  async findAll() {
    return this.prisma.serviceOrder.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.serviceOrder.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);
    }

    return order;
  }

  async update(id: number, data: UpdateServiceOrderDto) {
    const serviceOrder = await this.prisma.serviceOrder.update({
      where: { id },
      data: {
        requester: data.requester,
      },
    });

    if (data.products && data.products.length > 0) {
      await this.prisma.serviceOrderProduct.deleteMany({
        where: { serviceOrderId: id },
      });

      const productsData = data.products.map((item) => ({
        serviceOrderId: id,
        productId: item.productId,
        requestedQuantity: item.requestedQuantity,
      }));

      await this.prisma.serviceOrderProduct.createMany({
        data: productsData,
      });
    }

    return serviceOrder;
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.serviceOrder.delete({
      where: { id },
    });
  }
}
