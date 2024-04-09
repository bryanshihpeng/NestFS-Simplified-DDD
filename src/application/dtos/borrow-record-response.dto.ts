import { IsNumber, IsString, IsDate } from 'class-validator';

export class BorrowRecordResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  bookId: number;

  @IsNumber()
  memberId: number;

  @IsDate()
  borrowDate: Date;

  @IsDate()
  returnDate?: Date;

  constructor(borrowRecord: BorrowRecord) {
    this.id = borrowRecord.id;
    this.bookId = borrowRecord.book.id;
    this.memberId = borrowRecord.member.id;
    this.borrowDate = borrowRecord.borrowDate;
    this.returnDate = borrowRecord.returnDate;
  }
}
