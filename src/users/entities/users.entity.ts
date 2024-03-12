import { Column,CreateDateColumn,Entity,OneToMany,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/posts.entity";
import { PostModule } from "src/posts/posts.module";
import { BaseModel } from "src/common/entity/base.entity";

@Entity()
export class UsersModel extends BaseModel{


    @Column({
        // 1)
        length: 20,
        unique: true,
    })
        // 1) 길이가 20을 넘지 않아야 함
        // 2) 유일무이한 값이 될 것
    nickname: string;

    @Column({
        unique: true,
    })
        // 1) 유일무이한 값이 될 것
    email: string;

    @Column()
    password: string;

    @Column({
        enum: Object.values(RolesEnum),
        default: RolesEnum.USER   //기본값을 user로 갖는다.
    })
    role: RolesEnum;
    
    @OneToMany(() => PostsModel, (post) => post.author)
    posts: PostsModel[];

}