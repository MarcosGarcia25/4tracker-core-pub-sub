import { RolesType } from './roles-type';

export interface UserSecurity {
  email: string;
  company: string;
  role: RoleUserSecurity;
}

interface RoleUserSecurity {
  type: RolesType;
  permissions: Array<string>;
}
