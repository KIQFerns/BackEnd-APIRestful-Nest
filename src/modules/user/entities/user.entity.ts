import { randomUUID } from 'crypto';
import { Role } from 'src/infra/http/modules/auth/roles/role.enum';
import { Replace } from 'src/utils/replace';

interface UserSchema {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
}

export class User {
  props: UserSchema;
  _id: string;

  constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      role: props.role,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get role(): string {
    return this.props.role;
  }

  set role(role: string) {
    this.props.role = role;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
}
