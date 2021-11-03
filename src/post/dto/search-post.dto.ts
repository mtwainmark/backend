import { ApiProperty } from "@nestjs/swagger";

export class SearchPostDto{
    @ApiProperty({required: false})
    title?: string;
    @ApiProperty({required: false})
    body?: string;
    @ApiProperty({required: false})
    views?: 'DESC' | 'ASC';
    @ApiProperty({required: false})
    tags?: string;
}