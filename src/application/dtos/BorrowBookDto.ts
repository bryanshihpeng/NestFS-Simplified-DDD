import { IsNumber } from 'class-validator';

export class BorrowBookDto {
  @IsNumber()
  bookId: number;

  @IsNumber()
  memberId: number;
}
