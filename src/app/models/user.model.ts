export type UserRole = 'ADMIN' | 'CUSTOMER';

export class User {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  phone!: string;
  role!: UserRole;
}
