import { EntityManager } from '@mikro-orm/postgresql';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookResponseDto } from 'src/application/dtos/book-response.dto';
import { CreateBookDto } from 'src/application/dtos/create-book.dto';
import { Book } from 'src/domain/entities/book';

@Controller('books')
export class BookController {
  constructor(private readonly em: EntityManager) {}

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto) {
    const book = this.em.create(Book, createBookDto);
    await this.em.persistAndFlush(book);
    return new BookResponseDto(book);
  }

  @Get()
  async getAllBooks() {
    const books = await this.em.find(Book, {});
    return books.map((book) => new BookResponseDto(book));
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    const book = await this.em.findOne(Book, { id });
    return new BookResponseDto(book);
  }
}
