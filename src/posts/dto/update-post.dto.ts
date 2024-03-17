import { PartialType, PickType } from "@nestjs/mapped-types";
import { createPostDto } from "./create-post.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdatePostDto extends PartialType(createPostDto){
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;
}