import { Position } from '../entities/position.entity';

export abstract class PositionRepository {
  abstract create(position: Position): Promise<void>;
}
