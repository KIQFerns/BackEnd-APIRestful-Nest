import { User } from '../entities/user.entity';

type Override = Partial<User>;
export const MakeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@email.com',
      name: 'caique',
      password: '123456789',
      ...override,
    },
    id,
  );
};
