import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  author?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
