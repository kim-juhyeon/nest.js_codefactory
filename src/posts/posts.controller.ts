import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { title } from 'process';


interface PostModel{
  id : number;
  author : String;
  title : String;
  content : String;
  likeCount : number;
  commentCount : number;
}

let posts : PostModel[] = [
  {
    id : 1,
    author : 'newjeans_official',
    title : '뉴진스 민지',
    content : '메이크업 고치고 있는 민지',
    likeCount : 100000,
    commentCount : 99999,
  },
  {
    id : 2,
    author : 'newjeans_official',
    title : '뉴진스 해린',
    content : '노래연습하고 있는 민지',
    likeCount : 100000,
    commentCount : 99999,
  },
  {
    id : 3,
    author : 'blackpink_official',
    title : '블랙핑크 로제',
    content : '종합운동장에서 웃고 있는 로제',
    likeCount : 100000,
    commentCount : 99999,
  },
]

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  // 모든 post를 다 가져온다.
  @Get()
  getPosts(){
    return posts;
  }
  

  // 2) GET /posts/:id
  // id에 해당되는 post를 가져온다.
  // 예를 들어서 id=1일 경우 id가 1인 포스트를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string){
    const post = posts.find((post) => post.id === +id); ///숫자로 변경

    if(!post){
      throw new NotFoundException();   ///status = 404 : 데이터가 없을경우 <- nest.js 의 경우 데이터가 없을경우, 
    }

    return post;
  }

  // 3) POST /posts
  // POST를 생성한다.

  @Post()
  postPosts(
    @Body('author') author:string,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    const post : PostModel = {
      id : posts[posts.length -1].id +1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [  //posts 스프레드를 해준다 그리고 마지막에 post를 추가합니다.
      ...posts,
      post,
    ];

    return post;  //최소한의 데이터를 추가하는게 좋습니다. (과금이 많이 나오기 때문에)
  }

  // 4) Put /posts/:id
  // id에 해당되는 Post를 변경한다.

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author? : string,
    @Body('title') title? : string,
    @Body('content') content? : string,
  ){
    const post = posts.find((post) => post.id === +id);

    if(!post){
      throw new NotFoundException();
    }
    if(author){
      post.author = author;
    }
    if(title){
      post.title = title;
    }
    if(content){
      post.content = content;
    }
    posts = posts.map(prevPost => prevPost.id === +id ? post : prevPost) /// 파라미터의 id가 posts.map한 prevpost.id 와 같다면 post를 변경하고 아니면 prevPost(원래데이터)로 진행한다.

    return post;
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
