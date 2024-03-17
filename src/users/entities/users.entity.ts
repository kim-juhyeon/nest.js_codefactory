import { Column,CreateDateColumn,Entity,OneToMany,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/posts.entity";
import { PostModule } from "src/posts/posts.module";
import { BaseModel } from "src/common/entity/base.entity";
import { IsEmail, IsString, Length } from "class-validator";
import { lengthValidationMessage } from "src/common/validation-message/length-validation.message";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { emailValidationMessage } from "src/common/validation-message/email-validation.message";
import { Exclude } from "class-transformer";

@Entity()
export class UsersModel extends BaseModel{


    @Column({
        // 1)
        length: 20,
        unique: true,
    })
    @IsString({
        message : stringValidationMessage,
    })
    @Length(1, 20, {
        message:lengthValidationMessage,
    })
        // 1) 길이가 20을 넘지 않아야 함
        // 2) 유일무이한 값이 될 것
    nickname: string;

    @Column({
        unique: true,
    })
    @IsString({
        message: stringValidationMessage,
    })
    @IsEmail({}, {
        message:emailValidationMessage,
    })
    @Length(3, 8, {
        message: lengthValidationMessage,
    })
        // 1) 유일무이한 값이 될 것
   
    email: string;

    @Column()
   @Exclude({
        toPlainOnly: true,
    }) 
    password: string;

    @Column({
        enum: Object.values(RolesEnum),
        default: RolesEnum.USER   //기본값을 user로 갖는다.
    })
    role: RolesEnum;
    
    @OneToMany(() => PostsModel, (post) => post.author)
    posts: PostsModel[];

}