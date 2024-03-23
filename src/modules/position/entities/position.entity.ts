import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface PositionProps {
  name: string;
  createdAt: Date;
}

export class Position {
  private props: PositionProps;
  private _id: string;

  constructor(
    props: Replace<
      PositionProps,
      { createdAt?: Date; description?: string | null }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
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

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
