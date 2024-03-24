import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateProductUseCase } from 'src/modules/product/useCases/createProductUseCase/createProductUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { CreateProductBody } from './dtos/createProductBody';
import { ProductViewModel } from './viewModels/productViewModel';
import { EditProductUseCase } from 'src/modules/product/useCases/editProductUseCase/editProductUseCase';
import { EditProductBody } from './dtos/editProductBody';
import { DeleteProductUseCase } from 'src/modules/product/useCases/deleteProductUseCase/deleteProductUseCase';
import { GetProductUseCase } from 'src/modules/product/useCases/getProductUseCase/getProductUseCase';
import { GetManyProductUseCase } from 'src/modules/product/useCases/getManyProductUseCase/getManyProductUseCase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('product')
@Controller('products')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private editProductUseCase: EditProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private getProductUseCase: GetProductUseCase,
    private getManyProductUseCase: GetManyProductUseCase,
  ) {}

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateProductBody,
  ) {
    const { name, description, quantity, value } = body;

    const product = await this.createProductUseCase.execute({
      name,
      description,
      value,
      quantity,
      userId: request.user.id,
    });

    return ProductViewModel.toHttp(product);
  }

  @Delete(':id')
  async deleteProduct(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') productId: string,
  ) {
    await this.deleteProductUseCase.execute({
      productId,
      userId: request.user.id,
    });
  }

  @Put(':id')
  async editProduct(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') productId: string,
    @Body() body: EditProductBody,
  ) {
    const { name, description, quantity, value } = body;

    await this.editProductUseCase.execute({
      productId,
      name,
      description,
      value,
      quantity,
      userId: request.user.id,
    });
  }

  @Get(':id')
  async getProduct(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') productId: string,
  ) {
    const product = await this.getProductUseCase.execute({
      productId,
      userId: request.user.id,
    });

    return ProductViewModel.toHttp(product);
  }

  @Get()
  async getManyProduct(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const products = await this.getManyProductUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
    });

    return products.map(ProductViewModel.toHttp);
  }
}
