import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Member {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
