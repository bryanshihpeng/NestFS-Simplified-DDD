import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterMemberDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
