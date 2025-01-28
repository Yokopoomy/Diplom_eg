export interface ICreateUserDto {
  email: string;
  passwordHash: string;
  name: string;
  contactPhone: string;
  role: string;
}
