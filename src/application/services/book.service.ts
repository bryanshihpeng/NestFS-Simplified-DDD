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

  async getAllBooks(): Promise<Book[]> {
    return await this.em.find(Book, {});
  }

  async getBookById(id: number): Promise<Book> {
    return await this.em.findOneOrFail(Book, id);
  }

  async updateBook(id: number, title?: string, author?: string, isAvailable?: boolean): Promise<Book> {
    const book = await this.em.findOneOrFail(Book, id);
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (isAvailable !== undefined) book.isAvailable = isAvailable;
    await this.em.persistAndFlush(book);
    return book;
  }
}
