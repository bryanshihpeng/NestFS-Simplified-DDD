import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Book } from 'src/domain/entities/book';
import { Member } from 'src/domain/entities/member';

@Injectable()
export class BorrowService {
  constructor(private readonly em: EntityManager) {}

  async borrowBook(bookId: number, memberId: number) {
    const book = await this.em.findOneOrFail(Book, { id: bookId });
    const member = await this.em.findOneOrFail(Member, { id: memberId });
    book.borrow(member);
    await this.em.persistAndFlush(book);
  }

  async returnBook(bookId: number) {
    const book = await this.em.findOneOrFail(Book, { id: bookId });
    book.return();
    await this.em.persistAndFlush(book);
  }
}
