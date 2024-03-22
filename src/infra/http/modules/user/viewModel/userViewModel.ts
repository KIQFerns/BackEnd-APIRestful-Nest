import { User } from '../../../../../modules/user/entities/user.entity';
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
