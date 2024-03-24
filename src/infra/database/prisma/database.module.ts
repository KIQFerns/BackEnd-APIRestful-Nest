import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from 'src/modules/user/repositories/users.repository';
import { PrismaUserRepository } from './repositories/prismaUserRepository';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { PrismaProductRepository } from './repositories/prismaProductRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [UserRepository, ProductRepository],
})
export class DatabaseModule {}
