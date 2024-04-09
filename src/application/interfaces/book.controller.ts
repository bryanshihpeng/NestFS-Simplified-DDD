import { Body, Controller, Post } from '@nestjs/common';
import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';
import { CreateBookDto } from 'src/application/dtos/create-book.dto';
import { UpdateBookDto } from 'src/application/dtos/update-book.dto';
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

  @Get()
  async getAllBooks() {
    const books = await this.bookService.getAllBooks();
    return books.map(book => new BookResponseDto(book));
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    const book = await this.bookService.getBookById(id);
    return new BookResponseDto(book);
  }

  @Put(':id')
  async updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    const book = await this.bookService.updateBook(id, updateBookDto.title, updateBookDto.author, updateBookDto.isAvailable);
    return new BookResponseDto(book);
  }
}
