import { UserRoles, Language } from '../models';

export type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRoles;
  language: Language;
  expiry: number;
};
