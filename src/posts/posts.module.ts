import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModel } from "./entities/posts.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { UsersModel } from "src/users/entities/users.entity";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostsModel,
        ]),
        AuthModule,
        UsersModule,
    ],
    controllers: [PostsController],
    providers: [PostsService]
})

export class PostModule {}