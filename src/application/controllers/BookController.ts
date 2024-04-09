import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from '../dtos/CreateBookDto';
import { BookService } from '../services/BookService';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.addNewBook(createBookDto.title, createBookDto.author);
  }
}
