import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BorrowBookDto } from 'src/application/dtos/borrow-book.dto';
import { ReturnBookDto } from 'src/application/dtos/return-book.dto';
import { BorrowService } from 'src/application/services/borrow-service';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    return await this.borrowService.borrowBook(
      borrowBookDto.bookId,
      borrowBookDto.memberId,
    );
  }

  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    return await this.borrowService.returnBook(returnBookDto.borrowRecordId);
  }

  @Get()
  async getAllBorrowRecords() {
    return await this.borrowService.getAllBorrowRecords();
  }

  @Get('member/:id')
  async getMemberBorrowRecords(@Param('id') memberId: number) {
    return await this.borrowService.getMemberBorrowRecords(memberId);
  }
}
