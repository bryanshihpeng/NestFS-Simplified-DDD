import { Module } from '@nestjs/common';
import { BookController } from './application/controllers/BookController';
import { MemberController } from './application/controllers/MemberController';
import { BookService } from './application/services/BookService';
import { MemberService } from './application/services/MemberService';

@Module({
  imports: [...],
  controllers: [BookController, MemberController],
  providers: [BookService, MemberService],
})
export class AppModule {}
