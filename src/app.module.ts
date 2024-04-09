import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BookController } from 'src/application/interfaces/BookController';
import { BorrowController } from 'src/application/interfaces/BorrowController';
import { MemberController } from 'src/application/interfaces/MemberController';
import { BookService } from 'src/application/services/book.service';
import { BorrowService } from 'src/application/services/borrow-service';
import { MemberService } from 'src/application/services/member.service';

import config from 'src/infrastructure/orm/mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  controllers: [BookController, MemberController, BorrowController],
  providers: [BookService, MemberService, BorrowService],
})
export class AppModule {}
