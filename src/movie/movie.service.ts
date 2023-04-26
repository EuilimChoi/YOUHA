import { Injectable } from '@nestjs/common';
import { Genres } from 'src/repository/entity/genres.entity';
import { Movies } from 'src/repository/entity/movies.entity';
import { RepositoryService } from 'src/repository/repository.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { MovieInfoDTO } from './interface/dto';
import { plainToInstance } from "class-transformer";
import { Actors } from 'src/repository/entity/actors.entity';
import { Directors } from 'src/repository/entity/directors,entity';
import { Trailers } from 'src/repository/entity/trailers.entity';

@Injectable()
export class MovieService {
    constructor(private repository: RepositoryService) { }
    async createMovie(movieInfo: MovieInfoDTO): Promise<Movies> {

        const actorList = await Promise.all(
            movieInfo.actors.map(async (actorName) => {
                const actor = await this.repository.getActor(actorName);
                return actor || await this.repository.createActor(actorName);
            })
        );
        const directorList = await Promise.all(
            movieInfo.directors.map(async (directorName) => {
                const director = await this.repository.getDirector(directorName)
                return director || await this.repository.createDirector(directorName);
            })
        );
        const genreList = await Promise.all(
            movieInfo.genres.map(async (genreName) => {
                const genre = await this.repository.getGenre(genreName);
                return genre || await this.repository.createGenre(genreName)
            })
        );

        const trailerList = movieInfo.trailers.map((trailer) => {
            return trailer
        })

        const movie = plainToInstance(Movies, movieInfo);
        movie.actors = actorList
        movie.directors = directorList
        movie.genres = genreList
        movie.trailers = trailerList

        return await this.repository.createMovie(movie)
    }

    async getMovieByQuery(query: any): Promise<Movies[]> {
        return this.repository.getMovieByQuery(query)
    }

    async getMovieDetail(movieId: number): Promise<Movies> {
        return this.repository.getMovie(movieId)
    }

    async getMovieList() { //페이징 해야함
        return this.repository.getMovieList()
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
