import { IsString, IsOptional } from 'class-validator';
export class TravelDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  longitude: string;

  @IsString()
  latitude: string;
}
