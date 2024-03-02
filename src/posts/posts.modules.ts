import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModel } from "./entities/posts.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [
        PostsController,
        TypeOrmModule.forFeature([
            PostsModel,
        ]),
    ],
    controllers: [PostsController],
    providers: [PostsService]
})

export class PostModule {}