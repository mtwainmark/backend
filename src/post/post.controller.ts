import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchPostDto } from './dto/search-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create post' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Get('/popular')
  @ApiOperation({ summary: 'Get popular posts' })
  findPopular() {
    return this.postService.findPopular();
  }

  @Get('/search')
  @ApiOperation({ summary: 'Get search posts' })
  searchPost(@Query() searchPost: SearchPostDto) {
    return this.postService.search(searchPost);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update post by id' })
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
