import { EntityManager } from '@mikro-orm/postgresql';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { MemberResponseDto } from 'src/application/dtos/member-response.dto';
import { RegisterMemberDto } from 'src/application/dtos/register-member.dto';
import { UpdateMemberDto } from 'src/application/dtos/update-member.dto';
import { Member } from 'src/domain/entities/member';

@Controller('members')
export class MemberController {
  constructor(private readonly em: EntityManager) {}

  @Post()
  async registerMember(@Body() registerMemberDto: RegisterMemberDto) {
    const member = this.em.create(Member, registerMemberDto);
    await this.em.persistAndFlush(member);
    return new MemberResponseDto(member);
  }

  @Put(':id')
  async updateMember(
    @Param('id') id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const member = await this.em.findOneOrFail(Member, id);
    member.name = updateMemberDto.name;
    member.email = updateMemberDto.email;
    await this.em.persistAndFlush(member);
    return new MemberResponseDto(member);
  }
}
