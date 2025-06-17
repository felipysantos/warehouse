import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from 'prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { ServiceOrderModule } from './service-order/service-order.module';

@Module({
  imports: [UserModule, ProductModule, ServiceOrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
