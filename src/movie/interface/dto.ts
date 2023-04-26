import {
    IsArray,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Trailers } from 'src/repository/entity/trailers.entity';


export class MovieInfoDTO {
    @IsString()
    name: string

    @IsString()
    originName: string

    @IsDate()
    openingDate: string

    @IsString()
    posterImage: string

    @IsString()
    synopsis: string

    @IsString()
    playtime: string

    @IsNumber()
    score: number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Trailers)
    trailers: Trailers[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    directors: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    genres: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    actors: string[];
}
