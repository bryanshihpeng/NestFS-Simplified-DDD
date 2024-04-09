import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
// Aggregate Root for the Member aggregate
export class Member {
  @PrimaryKey()
  id!: number;
  ...

  @Property()
  name: string;

  @Property()
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.validateEmail();
  }

  private validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error('Invalid email format.');
    }
  }
}
