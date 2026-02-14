import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReactionResolver } from './reaction.resolver';
import { ReactionService } from './reaction.service';

@Module({
  imports: [PrismaModule],
  providers: [ReactionResolver, ReactionService],
})
export class ReactionModule {}
