import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Book } from 'src/domain/entities/book';

@Injectable()
export class BookService {
  constructor(private readonly em: EntityManager) {}

  async addNewBook(title: string, author: string, isAvailable: boolean = true): Promise<Book> {
    const book = new Book(title, author, isAvailable);
    await this.em.persistAndFlush(book);
    return book;
  }
}
