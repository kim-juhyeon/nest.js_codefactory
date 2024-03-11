import { Column,CreateDateColumn,Entity,OneToMany,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/posts.entity";
import { PostModule } from "src/posts/posts.module";

@Entity()
export class UsersModel {
    @PrimaryGeneratedColumn() //Postmodel의 number가 있는데 독립적으로 카운팅됩니다.
    id: number;

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

    @UpdateDateColumn() //자동으로 업데이트 될 때마다 날짜를 알 수 있음
    updateAt: Date;
    @CreateDateColumn()
    createdAt: Date;
}