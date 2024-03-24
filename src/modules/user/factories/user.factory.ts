import { Role } from 'src/infra/http/modules/auth/roles/role.enum';
import { User } from '../entities/user.entity';

type Override = Partial<User>;
export const MakeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@email.com',
      name: 'caique',
      password: '123456789',
      role: 'user',
      ...override,
    },
    id,
  );
};
