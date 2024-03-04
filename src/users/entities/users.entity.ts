import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";

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
}