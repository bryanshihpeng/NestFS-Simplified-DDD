import { EntityManager } from '@mikro-orm/postgresql';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookResponseDto } from 'src/application/dtos/book-response.dto';
import { BorrowBookDto } from 'src/application/dtos/borrow-book.dto';
import { BorrowRecordResponseDto } from 'src/application/dtos/borrow-record-response.dto';
import { CreateBookDto } from 'src/application/dtos/create-book.dto';
import { ReturnBookDto } from 'src/application/dtos/return-book.dto';
import { BorrowService } from 'src/application/services/borrow-service';
import { Book } from 'src/domain/entities/book';

@Controller('books')
export class BookController {
  constructor(
    private readonly em: EntityManager,
    private borrowService: BorrowService,
  ) {}

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto) {
    const book = this.em.create(Book, createBookDto);
    await this.em.persistAndFlush(book);
    return new BookResponseDto(book);
  }

  @Post(':id/borrow')
  async borrowBook(
    @Param('id') bookId: number,
    @Body() borrowBookDto: BorrowBookDto,
  ) {
    await this.borrowService.borrowBook(bookId, borrowBookDto.memberId);
  }

  @Post(':id/return')
  async returnBook(
    @Param('id') bookId: number,
    @Body() returnBookDto: ReturnBookDto,
  ) {
    await this.borrowService.returnBook(returnBookDto.borrowRecordId);
  }

  @Get(':id/borrows')
  async getBookBorrowRecords(@Param('id') bookId: number) {
    const book = await this.em.findOneOrFail(Book, { id: bookId });
    return book.borrowRecords.map(
      (record) => new BorrowRecordResponseDto(record),
    );
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
