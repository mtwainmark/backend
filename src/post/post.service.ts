import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { table } from 'console';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>)
  {}

  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find({order: {
      createdAt: "DESC"
    }});
  }

  findPopular() {
    return this.repository.find({order: {
      views: "DESC"
    }});
  }

  async findOne(id: number) {
    const find = await this.repository.findOne(id);

    if(!find){
      throw new NotFoundException("Post not found")
    }

    this.repository.update(id, {...find, views: find.views + 1})

    return find;
  }

  update(id: number, dto: UpdatePostDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  async search(dto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder('p')

    if(dto.views){
      qb.orderBy('views', dto.views)
    }

    if(dto.body){
      qb.andWhere(`p.body ILIKE :body`)
    }

    if(dto.title){
      qb.andWhere(`p.title ILIKE :title`)
    }

    if(dto.tags){
      qb.andWhere(`p.tags ILIKE :tags`)
    }
  
    qb.setParameters({
      title: `%${dto.title}%`,
      tags: `%${dto.tags}%`,
      body: `%${dto.body}%`
    })

    const [items, total] = await qb.getManyAndCount();

    return {items, total}
  }
}
