import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from 'src/application/dtos/create-book.dto';
import { BookService } from 'src/application/services/book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.addNewBook(
      createBookDto.title,
      createBookDto.author,
    );
  }
}
