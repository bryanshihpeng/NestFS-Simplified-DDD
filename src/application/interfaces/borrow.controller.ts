import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BorrowBookDto } from 'src/application/dtos/borrow-book.dto';
import { BorrowRecordResponseDto } from 'src/application/dtos/borrow-record-response.dto';
import { ReturnBookDto } from 'src/application/dtos/return-book.dto';
import { BorrowService } from 'src/application/services/borrow-service';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    await this.borrowService.borrowBook(
      borrowBookDto.bookId,
      borrowBookDto.memberId,
    );
  }

  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    await this.borrowService.returnBook(returnBookDto.borrowRecordId);
  }

  @Get()
  async getAllBorrowRecords() {
    const borrowRecords = await this.borrowService.getAllBorrowRecords();
    return borrowRecords.map((record) => new BorrowRecordResponseDto(record));
  }

  @Get('member/:id')
  async getMemberBorrowRecords(@Param('id') memberId: number) {
    const borrowRecords =
      await this.borrowService.getMemberBorrowRecords(memberId);
    return borrowRecords.map((record) => new BorrowRecordResponseDto(record));
  }
}
