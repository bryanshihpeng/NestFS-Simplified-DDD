import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Member } from 'src/domain/entities/member';

@Injectable()
export class MemberService {
  constructor(private readonly em: EntityManager) {}

  async registerMember(name: string, email: string): Promise<Member> {
    const member = new Member(name, email);
    await this.em.persistAndFlush(member);
    return member;
  }

  async updateMemberData(
    id: number,
    name: string,
    email: string,
  ): Promise<Member> {
    const member = await this.em.findOneOrFail(Member, id);
    member.name = name;
    member.email = email;
    await this.em.persistAndFlush(member);
    return member;
  }
}
