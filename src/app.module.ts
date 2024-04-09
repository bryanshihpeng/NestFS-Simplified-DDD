import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BookController } from 'src/application/interfaces/book.controller';
import { MemberController } from 'src/application/interfaces/member.controller';
import { BorrowService } from 'src/application/services/borrow-service';

import config from 'src/infrastructure/orm/mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  controllers: [BookController, MemberController],
  providers: [BorrowService],
})
export class AppModule {}
