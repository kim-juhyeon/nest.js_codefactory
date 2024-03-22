import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { PostModule } from './posts.module';
import { createPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {paginatePostsDto } from './dto/paginate-post.dto';
import { HOST, PROTOCOL } from 'src/common/const/env.const';
import { PostsModel } from './entities/posts.entity';


export interface PostModel{
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

  async generatePosts() {
    
  }


  //오름차 순으로 정렬하는 pagination만 구현한다.
  async paginatePosts(dto: paginatePostsDto) {
    const where: FindOptionsWhere<PostsModel> = {
      if(dto.where__id_less_than){
        where.id = LessThan(dto.where__id_less_than);
      }
    };
    // 1,2,3,4,5
    const posts = await this.postsRepository.find({
      where{
      id: LessThan(dto.where__id_less_than);
    }else if (dot.where__id_more_than) {
      where.id = MoreThan(dto.where__id_more_than);
      }
      //order__createdAt
      order:{
        createdAt: dto.order__createdAt,
      },
      take: dto.take,
    });

    //해당되는 포스트가 0개 이상이면
    // 마지막 포스트를 가져오고
    // 아니면 Null을 반환한다.
    const lastItem = posts.length > 0 && posts.length === dto.take ? posts[posts.length - 1] : null;

    const nextUrl = lastItem && new URL(`${PROTOCOL}:http://${HOST}/posts`);
    if (nextUrl) {
      /**
       * dto의 키값들을 루핑하면서
       * 키값에 해당되는 벨류가 존재하면
       * param에 그대로 붙여넣는다.
       * 
       * 단, where__id_more_than 값만 lasteItem의 마지막 값으로 넣어준다.
       */
      for (const key of Object.keys(dto)) {
        if (dto[key]){
          if (key !== 'where__id_more_than' && key !== 'where__id_less_than') {
            nextUrl.searchParams.append(key, dto[key]);
          } 
        }
      }
      let key = null;
      if (dto.order__createdAt === 'ASC') {
        key = 'where__id_more_than';
      } else {
        key = 'where_id_less_than';
      }
      nextUrl.searchParams.append('where__id_more_than', lastItem.id.toString());
    }
    /**
     * Response
     * data : Date[],
     * cursor : {
     *   after: 마지막 Data의 ID
     * },
     * count : 응답한 데이터의 갯수
     * next : 다음 요청을 할때 사용할 URL
     */
    return {
      data: posts,
      cursor: {
        after: lastItem.id ?? null,
      },
      count: posts.length,
      next : nextUrl?.toString(),
    }
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
  }//필수

  async createPost(authorId: number, postDto: createPostDto) {
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...postDto,
      likeCount: 0,
      commentCount: 0,
    });
    
    const newPost = await this.postsRepository.save(post);
    return newPost;
  }
  async updatePost(postId: number, postDto: UpdatePostDto) {
    const { title, content } = postDto;
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