import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { POSTGRES_CONNECTION } from '../database/const/postgres-connection.const';

@Module({
  imports: [TypeOrmModule.forFeature([Post], POSTGRES_CONNECTION)],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
