import { PartialType, PickType } from "@nestjs/mapped-types";
import { createPostDto } from "./create-post.dto";
import { IsOptional, IsString } from "class-validator";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";

export class UpdatePostDto extends PartialType(createPostDto){
    @IsString({
        message: stringValidationMessage,
    })
    @IsOptional()
    title?: string;

    @IsString({
        message: stringValidationMessage,
    })
    @IsOptional()
    content?: string;
}