import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Book } from 'src/domain/entities/book';
import { BorrowRecord } from 'src/domain/entities/borrow-record';
import { Member } from 'src/domain/entities/member';

@Injectable()
export class BorrowService {
  constructor(private readonly em: EntityManager) {}

export class BorrowService {
  ...
  async borrowBook(bookId: number, memberId: number) {
    const book = await this.em.findOneOrFail(Book, { id: bookId }, ['borrowRecords']);
    const member = await this.em.findOneOrFail(Member, { id: memberId });
    book.borrowBook(member);
    await this.em.persistAndFlush(book);
  }

  async returnBook(borrowRecordId: number): Promise<BorrowRecord> {
    const borrowRecord = await this.em.findOneOrFail(BorrowRecord, { id: borrowRecordId }, ['book']);
    const book = borrowRecord.book;
    book.return(borrowRecord);
    await this.em.persistAndFlush(borrowRecord);
    return borrowRecord;
  }
  ...

  async getAllBorrowRecords(bookId: number): Promise<BorrowRecord[]> {
    return await this.em.find(
      BorrowRecord,
      { id: bookId },
      { populate: ['book', 'member'] },
    );
  }

  async getMemberBorrowRecords(memberId: number): Promise<BorrowRecord[]> {
    return await this.em.find(
      BorrowRecord,
      { member: memberId },
      { populate: ['book'] },
    );
  }
}
