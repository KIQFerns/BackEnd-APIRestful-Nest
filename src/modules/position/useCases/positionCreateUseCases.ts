import { Injectable } from '@nestjs/common';
import { Position } from '../entities/position.entity';
import { PositionRepository } from '../repositories/position.repository';

interface CreateProductRequest {
  name: string;
}

@Injectable()
export class CreatePositionUseCase {
  constructor(private positionRepository: PositionRepository) {}

  async execute({ name }: CreateProductRequest) {
    const product = new Position({
      name,
    });

    await this.positionRepository.create(product);

    return product;
  }
}
