import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BorrowRecord } from 'src/domain/entities/borrow-record';
import { Member } from 'src/domain/entities/member';

@Entity()
// Aggregate Root for the Book aggregate
export class Book {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string;

  @Property()
  author: string;

  @OneToMany(() => BorrowRecord, (borrowRecord) => borrowRecord.book, {
    eager: true,
  })
  borrowRecords = new Collection<BorrowRecord>(this);

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  get isAvailable(): boolean {
    return (
      this.borrowRecords.length == 0 ||
      this.borrowRecords.exists(
        (record) => !!record.returnDate && !!record.borrowDate,
      )
    );
  }

  borrow(member: Member, borrowDate: Date = new Date()) {
    if (!this.isAvailable) {
      throw new Error('Book is not available for borrowing.');
    }
    const record = new BorrowRecord(this, member, borrowDate);
    this.borrowRecords.add(record);
  }

  return() {
    if (this.isAvailable) {
      throw new Error('Book is already available.');
    }
    const record = this.borrowRecords.find((record) => !record.returnDate);
    if (!record) {
      throw new Error('No active borrow record found.');
    }
    if (record.isOverdue()) {
      // some logic to handle overdue
    }
    record.returnBook();
  }
}
