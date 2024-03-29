import { Body, Controller, DefaultValuePipe, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Request, UseGuards, Patch, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { User } from 'src/users/decorator/user.decorator';
import { createPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { query } from 'express';
import { paginatePostsDto } from './dto/paginate-post.dto';



@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 2) GET /posts/:id
  // id에 해당되는 post를 가져온다.
  // 예를 들어서 id=1일 경우 id가 1인 포스트를 가져온다.
  @Get()
  getPosts(
    @Query() query: paginatePostsDto,
  ) {
    return this.postsService.paginatePosts(query);
  }

  @Get(':id')
  getPost(@Param('id',ParseIntPipe) id: number){  //pipe를 사용하면, 원하는 값을 강제로 입력하게 하고, 검증을 하게 합니다.
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  // POST를 생성한다.

  // DTO - Data Transfer Object
  @Post()
  @UseGuards(AccessTokenGuard) //가드를 이용해서 통과한 id 값을 가져옵니다. = authorId
  postPosts(
    // @Request() req:any,
    @User('id') userId: number,
    @Body() body: createPostDto,
    // @Body('title') title: string,
    // @Body('content') content: string,
  ) {
    return this.postsService.createPost(
      userId, body,
    );
  }

  // 4) PATCH /posts/:id
  // id에 해당되는 Post를 변경한다.

  @Patch(':id')
  patchPost(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: UpdatePostDto
    // @Body('title') title? : string,
    // @Body('content') content? : string,
  ){
    return this.postsService.updatePost(
     +id, body,
   )
  }

  // 5) Delete /posts/:id
  // id에 해당되는 POST를 삭제한다.

  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ){
    const post = posts.find((post) => post.id === +id); ///숫자로 변경

    if(!post){
      throw new NotFoundException();   ///status = 404 : 데이터가 없을경우 <- nest.js 의 경우 데이터가 없을경우, 
    }

    posts = posts.filter(post => post.id !== +id); //자바스크립트의 fillter 문법은 조건을 만족하는 요소만을 남기고 다른 요소를 제거합니다

    return id;

  }
}
