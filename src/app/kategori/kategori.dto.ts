import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class KategoriDto {
  @IsInt()
  id?: number;

  @IsString()
  nama_kategori: string;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateKategoriDto extends OmitType(KategoriDto, [
  'id',
  'updated_by',
]) {} // ketika create kecualikan id , dan updated_by

export class CreateKategoriArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKategoriArrayDto)
  data: CreateKategoriArrayDto[];
}

export class UpdateKategoriDto extends OmitType(KategoriDto, ['created_by']) {}

export class findAllKategori extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_kategori: string;
}
