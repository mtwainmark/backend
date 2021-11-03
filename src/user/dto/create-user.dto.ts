import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}