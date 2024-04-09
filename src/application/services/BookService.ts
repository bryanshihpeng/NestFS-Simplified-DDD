import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Book } from 'src/domain/entities/Book';

@Injectable()
export class BookService {
  constructor(private readonly em: EntityManager) {}

  async addNewBook(title: string, author: string): Promise<Book> {
    const book = new Book(title, author);
    await this.em.persistAndFlush(book);
    return book;
  }
}
