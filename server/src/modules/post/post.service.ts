import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POSTGRES_CONNECTION } from '../database/const/postgres-connection.const';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post, POSTGRES_CONNECTION)
    private readonly postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepository.save({
      title: 'test',
      description: 'testsetse',
    } as Partial<Post>);
  }

  findAll() {
    return this.postRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
