import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Book } from './Book';
import { Member } from './Member';

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
