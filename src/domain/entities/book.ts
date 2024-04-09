import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Book {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string;

  @Property()
  author: string;

  @Property({ default: true })
  isAvailable: boolean;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }

  borrowBook() {
    if (!this.isAvailable) {
      throw new Error('Book is not available for borrowing.');
    }
    this.isAvailable = false;
  }

  returnBook() {
    this.isAvailable = true;
  }
}
