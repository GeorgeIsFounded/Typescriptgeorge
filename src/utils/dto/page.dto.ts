import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PageRequestDto {
  @IsInt()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @Type(() => Number)
  pageSize = 10;

  @IsInt()
  @IsOptional()
  limit;

  @IsString()
  @IsOptional()
  tittle;

  @IsString()
  @IsOptional()
  author;

  @IsInt()
  @IsOptional()
  from_year;

  @IsInt()
  @IsOptional()
  to_year;
}
