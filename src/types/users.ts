export enum UserRolesEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  CASHIER = 'CASHIER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED'
}

export const roles = [
  { label: 'Админ', value: UserRolesEnum.ADMIN },
  { label: 'Менеджер', value: UserRolesEnum.MANAGER },
  { label: 'Ученик', value: UserRolesEnum.STUDENT },
  { label: 'Преподаватель', value: UserRolesEnum.TEACHER },
  { label: 'Родитель', value: UserRolesEnum.PARENT },
  { label: 'Кассир Столовая', value: UserRolesEnum.CASHIER }
];

export const statuses = [
  { label: 'Выключен', value: UserStatus.INACTIVE },
  { label: 'Активный', value: UserStatus.ACTIVE },
  { label: 'Заблокирован', value: UserStatus.BLOCKED }
];

export type User = {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  groupId?: number;
  schoolId?: number;
  phone: string;
  role: UserRolesEnum;
  isInSchool: boolean;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateUserDto extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
