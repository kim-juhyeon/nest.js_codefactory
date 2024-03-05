import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModel } from "./entities/posts.entity";
import { PostsController } from './PostsController';
import { PostsService } from "./posts.service";
import { UsersModel } from "src/users/entities/users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostsModel,
        ]),
        UsersModel
    ],
    controllers: [PostsController],
    providers: [PostsService]
})

export class PostModule {}