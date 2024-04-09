import { Body, Controller, Post } from '@nestjs/common';
import { RegisterMemberDto } from '../dtos/RegisterMemberDto';
import { MemberService } from '../services/MemberService';

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
}
