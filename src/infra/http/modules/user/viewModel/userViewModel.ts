import { User } from '../../../../../modules/user/entities/user.entity';
export class UserViewModel {
  static toHttp({ createdAt, name, role, email, id }: User) {
    return {
      createdAt,
      name,
      role,
      email,
      id,
    };
  }
}
