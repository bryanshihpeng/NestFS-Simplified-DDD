import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from '@nestjs/common';
import { Book } from 'src/domain/entities/Book';
import { BorrowRecord } from 'src/domain/entities/BorrowRecord';
import { Member } from 'src/domain/entities/Member';
import config from "src/mikro-orm.config";
import { BookController } from './application/controllers/BookController';
import { MemberController } from './application/controllers/MemberController';
import { BorrowController } from './application/controllers/BorrowController';
import { BookService } from './application/services/BookService';
import { MemberService } from './application/services/MemberService';
import { BorrowService } from './application/services/BorrowService';

@Module({
  imports: [ MikroOrmModule.forRoot(config)],
  controllers: [BookController, MemberController, BorrowController],
  providers: [BookService, MemberService, BorrowService],
})
export class AppModule {}
