import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModule } from './posts.modules';

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
  ];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModule)
    private readonly postsRepository: Repository<PostModel>
  ) { }
  async getAllPosts() {
    return await this.postsRepository.find({
     relations:['author']
    });
  }
  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['author']
    });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
  async createPost(authorId: number, title: string, content: string) {
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });
    const newPost = await this.postsRepository.save(post);
    return newPost;
  }
  async updatePost(postId: number, title: string, content: string) {
    // save 기능
    // 1) 만약에 데터 존하 않ㅡ다면, (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면, (같은 id값이 존재 한다면) 존재하던 값을 업데이트한다.
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      }
    });
    // const psot = posts.find(post => post.id === postId);
    if (!post) {
      throw new NotFoundException();
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }
  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      }
    })

    if (!post) {
      throw new NotFoundException();
    }
    await this.postsRepository.delete(postId);
  }
}