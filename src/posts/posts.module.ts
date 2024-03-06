import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModel } from "./entities/posts.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { UsersModel } from "src/users/entities/users.entity";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostsModel,
        ]),
        UsersModule,
    ],
    controllers: [PostsController],
    providers: [PostsService]
})

export class PostModule {}