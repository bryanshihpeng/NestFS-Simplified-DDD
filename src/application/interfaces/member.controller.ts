import { Body, Controller, Post } from '@nestjs/common';
import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';
import { RegisterMemberDto } from 'src/application/dtos/register-member.dto';
import { UpdateMemberDto } from 'src/application/dtos/update-member.dto';
import { MemberService } from 'src/application/services/member.service';
import { MemberResponseDto } from 'src/application/dtos/member-response.dto';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async registerMember(@Body() registerMemberDto: RegisterMemberDto) {
    return await this.memberService.registerMember(
      registerMemberDto.name,
      registerMemberDto.email,
    );
  }

  @Get()
  async getAllMembers() {
    const members = await this.memberService.getAllMembers();
    return members.map(member => new MemberResponseDto(member));
  }

  @Get(':id')
  async getMemberById(@Param('id') id: number) {
    const member = await this.memberService.getMemberById(id);
    return new MemberResponseDto(member);
  }

  @Put(':id')
  async updateMember(@Param('id') id: number, @Body() updateMemberDto: UpdateMemberDto) {
    const member = await this.memberService.updateMemberData(id, updateMemberDto.name, updateMemberDto.email);
    return new MemberResponseDto(member);
  }
}
