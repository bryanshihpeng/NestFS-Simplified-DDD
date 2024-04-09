import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from 'src/domain/entities/book';
import { Member } from 'src/domain/entities/member';

@Entity()
export class BorrowRecord {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => Member)
  member: Member;

  @Property()
  borrowDate: Date;

  @Property({ nullable: true })
  returnDate?: Date;

  constructor(book: Book, member: Member, borrowDate: Date = new Date()) {
    this.book = book;
    this.member = member;
    this.borrowDate = borrowDate;
    this.book.borrowBook();
  }

  returnBook() {
    if (this.returnDate) {
      throw new Error('Book has already been returned.');
    }
    this.returnDate = new Date();
    this.book.returnBook();
  }

  isOverdue(currentDate = new Date()): boolean {
    const dueDate = new Date(this.borrowDate);
    dueDate.setDate(dueDate.getDate() + 30); // Assuming 30 days borrowing period
    return currentDate > dueDate;
  }
}
