import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/prisma/database.module';
import { CreateProductUseCase } from 'src/modules/product/useCases/createProductUseCase/createProductUseCase';
import { EditProductUseCase } from 'src/modules/product/useCases/editProductUseCase/editProductUseCase';
import { DeleteProductUseCase } from 'src/modules/product/useCases/deleteProductUseCase/deleteProductUseCase';
import { GetProductUseCase } from 'src/modules/product/useCases/getProductUseCase/getProductUseCase';
import { GetManyProductUseCase } from 'src/modules/product/useCases/getManyProductUseCase/getManyProductUseCase';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  imports: [DatabaseModule],
  providers: [
    CreateProductUseCase,
    EditProductUseCase,
    DeleteProductUseCase,
    GetProductUseCase,
    GetManyProductUseCase,
  ],
})
export class ProductModule {}
