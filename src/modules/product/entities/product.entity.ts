import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface ProductProps {
  name: string;
  description: string | null;
  value: number;
  quantity: number;
  userId: string;
  createdAt: Date;
}

export class Product {
  private props: ProductProps;
  private _id: string;

  constructor(
    props: Replace<
      ProductProps,
      { createdAt?: Date; description?: string | null }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      description: props.description ?? null,
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get value(): number {
    return this.props.value;
  }

  set value(value: number) {
    this.props.value = value;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
