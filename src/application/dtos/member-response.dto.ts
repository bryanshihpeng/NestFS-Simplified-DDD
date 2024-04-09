import { IsNumber, IsString } from 'class-validator';
import { Member } from 'src/domain/entities/member';

export class MemberResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  constructor(member: Member) {
    this.id = member.id;
    this.name = member.name;
    this.email = member.email;
  }
}
