import { Body, Controller, Post } from '@nestjs/common';
import { RegisterMemberDto } from 'src/application/dtos/register-member.dto';
import { MemberService } from 'src/application/services/member.service';

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
