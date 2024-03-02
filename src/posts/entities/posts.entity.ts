import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostsModel {
    @PrimaryGeneratedColumn() //절대적으로 필요하다. 식별할 수 있는 column이 필요합니다.
    id: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    likeCount: number;

    @Column()
    commentCount: number;
}