import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersModel {
    @PrimaryGeneratedColumn() //Postmodel의 number가 있는데 독립적으로 카운팅됩니다.
    id: number;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column()
    password: string;
}