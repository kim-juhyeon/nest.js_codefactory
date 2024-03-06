import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';



@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 2) GET /posts/:id
  // id에 해당되는 post를 가져온다.
  // 예를 들어서 id=1일 경우 id가 1인 포스트를 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string){
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  // POST를 생성한다.

  @Post()
  postPosts(
    @Body('authorId') authorId:number,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    return this.postsService.createPost(
      authorId, title, content,
    );
  }

  // 4) Put /posts/:id
  // id에 해당되는 Post를 변경한다.

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('title') title? : string,
    @Body('content') content? : string,
  ){
    return this.postsService.updatePost(
     +id, title, content,
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
