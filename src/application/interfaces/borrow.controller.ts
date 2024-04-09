import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BorrowBookDto } from 'src/application/dtos/borrow-book.dto';
import { ReturnBookDto } from 'src/application/dtos/return-book.dto';
import { BorrowService } from 'src/application/services/borrow-service';
import { BorrowRecordResponseDto } from 'src/application/dtos/borrow-record-response.dto';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    const borrowRecord = await this.borrowService.borrowBook(
      borrowBookDto.bookId,
      borrowBookDto.memberId,
    );
    return new BorrowRecordResponseDto(borrowRecord);
  }

  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    const borrowRecord = await this.borrowService.returnBook(returnBookDto.borrowRecordId);
    return new BorrowRecordResponseDto(borrowRecord);
  }

  @Get()
  async getAllBorrowRecords() {
    const borrowRecords = await this.borrowService.getAllBorrowRecords();
    return borrowRecords.map(record => new BorrowRecordResponseDto(record));
  }

  @Get('member/:id')
  async getMemberBorrowRecords(@Param('id') memberId: number) {
    const borrowRecords = await this.borrowService.getMemberBorrowRecords(memberId);
    return borrowRecords.map(record => new BorrowRecordResponseDto(record));
  }
}
