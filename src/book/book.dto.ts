import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, Min, Max, Length } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class BookDto {
  id: number;

  @IsNotEmpty() // title tidak boleh kosong
  @Length(4, 10) // panjang karakter dari title minimal 4 dan maksimal 10
  tittle: string;

  @IsNotEmpty()
  author: string;

  @IsInt() // year wajib number
  @Min(2020) // minimal tahun adalah 2020
  @Max(2023) //maksimal tahun adalah 2023
  year: number;
}

export class FindBookDto extends PageRequestDto {}
export class CreateBookDto extends OmitType(BookDto, ['id']) {}
export class UpdateBookDto extends PickType(BookDto, [
  'id',
  'tittle',
  'author',
  'year',
]) {}
