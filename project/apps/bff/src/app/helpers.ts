import { UserRdo } from './rdo';

export function generateUsersReference (users: UserRdo[]) {
  const usersReference = new Map();
  users.forEach((user) => {
    usersReference.set(user.id, user);
  });
  return usersReference;
}
