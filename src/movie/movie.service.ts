import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Movies } from 'src/repository/entity/movies.entity';
import { RepositoryService } from 'src/repository/repository.service';
import { DeleteResult } from 'typeorm';
import { MovieInfoDTO } from './interface/dto';


@Injectable()
export class MovieService {
    constructor(private repository: RepositoryService,) { }
    async createMovie(movieInfo: MovieInfoDTO): Promise<Movies> {
        const movie = await this.repository.createMovie(movieInfo)
        if (movie === "duplicate") throw new HttpException('duplicate', HttpStatus.CONFLICT)
        return movie as Movies
    }

    async getMovieByQuery(query: any): Promise<MovieInfoDTO[]> {
        const movies = await this.repository.getMovieByQuery(query)
        if (movies.length === 0) throw new HttpException('no content', HttpStatus.NO_CONTENT)
        return movies
    }

    async getMovieDetail(movieId: number): Promise<MovieInfoDTO> {
        const movie = await this.repository.getMovie(movieId)
        if (!movie) throw new HttpException('no content', HttpStatus.NO_CONTENT)
        return movie
    }

    async updateMovie(movieInfo: MovieInfoDTO, movieId: number): Promise<Movies> {
        const movie = await this.repository.updateMovieInfo(movieInfo, movieId)
        if (!movie) throw new HttpException('bad request', HttpStatus.BAD_REQUEST)
        if (movie === 'duplicate') throw new HttpException('duplicate', HttpStatus.CONFLICT)
        return movie as Movies
    }

    async deleteMovie(movieId: number): Promise<string> {
        const movie = await this.repository.deleteMovieInfo(movieId)
        if (!movie) throw new HttpException('bad request', HttpStatus.BAD_REQUEST)
        return movie
    }
}
