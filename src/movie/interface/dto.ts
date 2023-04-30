import {
    IsArray,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';



export class MovieInfoDTO {
    @IsNumber()
    @IsOptional()
    id?: number

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    originName: string

    @ApiProperty()
    @IsDate()
    openingDate: string

    @ApiProperty()
    @IsString()
    posterImage: string

    @ApiProperty()
    @IsString()
    synopsis: string

    @ApiProperty()
    @IsString()
    playtime: string

    @ApiProperty()
    @IsNumber()
    score: number

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    trailers: string[]

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    directors: string[];

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    genres: string[];

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    actors: string[];
}
