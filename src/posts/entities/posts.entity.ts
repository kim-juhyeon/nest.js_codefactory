import { UsersModel } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostsModel {
    @PrimaryGeneratedColumn() //절대적으로/ 필요하다. 식별할 수 있는 column이 필요합니다.
    id: number;

    //1) UsersModel과 연동한다. Foreign Key를 이용해서
    //2) null이 될 수 없다. (하나의 사용자가 여러개의 post를 가질 수 있으므로)
    @ManyToOne(() => UsersModel, (user) => user.posts, {
        nullable: false,
    })
    author: UsersModel;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    likeCount: number;

    @Column()
    commentCount: number;

    @UpdateDateColumn()
    updatedAt: Date;


    @UpdateDateColumn()
    createdAt: Date;
}