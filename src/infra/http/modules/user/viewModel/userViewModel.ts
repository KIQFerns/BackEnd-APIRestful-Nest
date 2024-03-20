import { User } from '../../../../../modules/user/entities/users.entity';
export class UserViewModel {
  static toHttp({ createdAt, name, password, email, id }: User) {
    return {
      createdAt,
      name,
      email,
      id,
    };
  }
}
