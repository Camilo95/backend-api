import { IsString, IsOptional, IsLatitude, IsLongitude } from 'class-validator';
export class TravelDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsLongitude()
  longitude: string;

  @IsString()
  @IsLatitude()
  latitude: string;
}
