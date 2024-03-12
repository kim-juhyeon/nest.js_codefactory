import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseModel{
    @PrimaryColumn()
    id: number;
    @UpdateDateColumn()
    updatedAt: Date;
    @CreateDateColumn()
    createdAt: Date;
}