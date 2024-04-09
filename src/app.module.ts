import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BookController } from 'src/application/controllers/BookController';
import { BorrowController } from 'src/application/controllers/BorrowController';
import { MemberController } from 'src/application/controllers/MemberController';
import { BookService } from 'src/application/services/BookService';
import { BorrowService } from 'src/application/services/BorrowService';
import { MemberService } from 'src/application/services/MemberService';

import config from 'src/mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  controllers: [BookController, MemberController, BorrowController],
  providers: [BookService, MemberService, BorrowService],
})
export class AppModule {}
