import { Injectable } from '@nestjs/common';
import { Genres } from 'src/repository/entity/genres.entity';
import { Movies } from 'src/repository/entity/movies.entity';
import { RepositoryService } from 'src/repository/repository.service';
import { DeleteResult, UpdateResult, getConnection } from 'typeorm';
import { MovieInfoDTO } from './interface/dto';
import { plainToInstance } from "class-transformer";
import { Actors } from 'src/repository/entity/actors.entity';
import { Directors } from 'src/repository/entity/directors.entity';
import { Trailers } from 'src/repository/entity/trailers.entity';

@Injectable()
export class MovieService {
    constructor(private repository: RepositoryService,) { }
    async createMovie(movieInfo: MovieInfoDTO): Promise<Movies> {
        return await this.repository.createMovie(movieInfo)
    }

    async getMovieByQuery(query: any): Promise<Movies[]> {
        return this.repository.getMovieByQuery(query)
    }

    async getMovieDetail(movieId: number): Promise<Movies> {
        return this.repository.getMovie(movieId)
    }

    async updateMovie(movieInfo: Movies, movieId: number): Promise<UpdateResult> {
        return this.repository.updateMovieInfo(movieInfo, movieId)
    }

    async deleteMovie(movieId: number): Promise<DeleteResult> {
        return this.repository.deleteMovieInfo(movieId)
    }

    async createGenre(genres: string): Promise<Genres> {
        return this.repository.createGenre(genres)
    }

}
