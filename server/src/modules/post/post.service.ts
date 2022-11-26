import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { REDIS_CACHE_MANAGER } from '../cache/symbols/redis.symbol';
import { POSTGRES_CONNECTION } from '../database/const/postgres-connection.const';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post, POSTGRES_CONNECTION)
    private readonly postRepository: Repository<Post>,

    @Inject(REDIS_CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(req: Request, createPostDto: CreatePostDto) {
    await this.cacheManager.set('test', new Date(Date.now()).toLocaleString());

    return this.postRepository.save({
      title: 'test',
      description: 'testsetse',
    } as Partial<Post>);
  }

  async findAll() {
    console.log(await this.cacheManager.get('test'));
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
