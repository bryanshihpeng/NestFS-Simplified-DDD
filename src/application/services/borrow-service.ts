import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Book } from 'src/domain/entities/book';
import { BorrowRecord } from 'src/domain/entities/borrow-record';
import { Member } from 'src/domain/entities/member';

@Injectable()
export class BorrowService {
  constructor(private readonly em: EntityManager) {}

  async borrowBook(bookId: number, memberId: number): Promise<BorrowRecord> {
    const book = await this.em.findOneOrFail(Book, bookId);
    const member = await this.em.findOneOrFail(Member, memberId);
    const borrowRecord = new BorrowRecord(book, member, new Date());
    await this.em.persistAndFlush(borrowRecord);
    return borrowRecord;
  }

  async returnBook(borrowRecordId: number): Promise<BorrowRecord> {
    const borrowRecord = await this.em.findOneOrFail(
      BorrowRecord,
      borrowRecordId,
    );
    borrowRecord.returnDate = new Date();
    await this.em.persistAndFlush(borrowRecord);
    return borrowRecord;
  }

  async getAllBorrowRecords(): Promise<BorrowRecord[]> {
    return await this.em.find(
      BorrowRecord,
      {},
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
