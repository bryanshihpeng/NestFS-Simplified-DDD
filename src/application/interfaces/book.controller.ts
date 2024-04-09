import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from 'src/application/dtos/create-book.dto';
import { BookService } from 'src/application/services/book.service';
import { BookResponseDto } from 'src/application/dtos/book-response.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.addNewBook(
      createBookDto.title,
      createBookDto.author,
    );
    return new BookResponseDto(book);
  }
}
