import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, FindBookDto } from './book.dto';
import { query } from 'express';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('list')
  getBooks(@Pagination() query: FindBookDto) {
    console.log('query', query);
    return this.bookService.getBooks(query);
  }

  @Post('create')
  createBook(@Body() payload: CreateBookDto) {
    return payload;
    //return this.bookService.create(payload)
  }
}
