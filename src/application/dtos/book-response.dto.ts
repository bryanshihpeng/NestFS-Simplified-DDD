import { IsNumber, IsString } from 'class-validator';
import { Book } from 'src/domain/entities/book';

export class BookResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  isAvailable: boolean;

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.author = book.author;
    this.isAvailable = book.isAvailable;
  }
}
