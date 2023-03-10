import { IsString, IsEnum } from 'class-validator';

export class UserDto {
  @IsString()
  firstName;

  @IsString()
  lastName;

  @IsString()
  email;

  @IsString()
  @IsEnum(['RIDER', 'DRIVER'])
  type;
}
