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

  constructor(book: Book, member: Member, borrowDate: Date) {
    this.book = book;
    this.member = member;
    this.borrowDate = borrowDate;
  }
}
