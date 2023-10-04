import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Repository } from 'typeorm';
import {
  ResponsePagination,
  ResponseSuccess,
} from 'src/interface/response.interface';
import { CreateBookDto, FindBookDto } from './book.dto';
import { query } from 'express';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async getBooks(query: FindBookDto): Promise<ResponsePagination> {
    console.log('uqwey', query);
    const { page, pageSize, limit, tittle, author, from_year, to_year } = query;

    const filter: {
      [key: string]: any;
    } = {};

    if (tittle) {
      filter.title = Like(`%${tittle}%`);
    }

    if (author) {
      filter.author = Like(`%${author}%`);
    }

    if (from_year && to_year) {
      filter.year = Between(from_year, to_year);
    }

    if (from_year && !!to_year === false) {
      filter.year = Between(from_year, from_year);
    }

    const total = await this.bookRepository.count({ where: filter });

    const result = await this.bookRepository.find({
      where: filter,
      skip: limit,
      take: pageSize,
    });

    // return this._pagination('berhasil', total, page, pageSize);

    return {
      status: 'Success',
      message: 'List Buku ditermukan',
      data: result,
      pagination: {
        total: total,
        page: Number(page),
        pageSize: Number(pageSize),
      },
    };
  }

  async create(payload: CreateBookDto): Promise<ResponseSuccess> {
    try {
      await this.bookRepository.save(payload);

      return {
        status: 'ok',
        message: 'created succesfully',
      };
    } catch (error) {
      throw new HttpException('waw ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const book = this.bookRepository.findOne({
      where: {
        id,
      },
    });
    if (book === null) {
      throw new HttpException(
        `Buku dengan id${id} tidak di temukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: 'Success',
      message: 'Berhasil menambakan buku',
    };
  }
}
