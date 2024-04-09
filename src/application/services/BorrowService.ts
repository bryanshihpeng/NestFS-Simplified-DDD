import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { BorrowRecord } from '../../domain/entities/BorrowRecord';
import { Book } from '../../domain/entities/Book';
import { Member } from '../../domain/entities/Member';

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
    const borrowRecord = await this.em.findOneOrFail(BorrowRecord, borrowRecordId);
    borrowRecord.returnDate = new Date();
    await this.em.persistAndFlush(borrowRecord);
    return borrowRecord;
  }
}
