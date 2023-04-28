import { Injectable, InternalServerErrorException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './entity/movies.entity';
import { DeleteResult, Repository, UpdateResult, Like, MoreThan, LessThan, Between, FindOptions, FindOptionsWhere } from 'typeorm';
import { Actors } from './entity/actors.entity';
import { Genres } from './entity/genres.entity';
import { Trailers } from './entity/trailers.entity';
import { Directors } from './entity/directors.entity';
import { MovieInfoDTO } from 'src/movie/interface/dto';
import { plainToInstance } from "class-transformer";
import { MoviesActors } from './entity/moviesActors.entity';
import { MoviesGenres } from './entity/moviesGenres.entity';
import { MoviesDirectors } from './entity/moviesDirectors.entitiy';

@Injectable()
export class RepositoryService {
    constructor(
        @InjectRepository(Movies)
        private moviesRepository: Repository<Movies>,
        @InjectRepository(Actors)
        private actorsRepository: Repository<Actors>,
        @InjectRepository(Genres)
        private genresRepository: Repository<Genres>,
        @InjectRepository(Trailers)
        private trailersRepository: Repository<Trailers>,
        @InjectRepository(Directors)
        private directorsRepository: Repository<Directors>,
        @InjectRepository(MoviesActors)
        private moviesActorsRepository: Repository<MoviesActors>,
        @InjectRepository(MoviesGenres)
        private moviesGenresRepository: Repository<MoviesGenres>,
        @InjectRepository(MoviesDirectors)
        private moviesDirectorsRepository: Repository<MoviesDirectors>,

    ) { }

    async createMovie(movieInfo: MovieInfoDTO): Promise<Movies> {
        try {
            const trailerList = await this.trailersRepository.save(movieInfo.trailers)

            const movie = plainToInstance(Movies, movieInfo);
            movie.trailers = trailerList

            const savedMovieInfo = await this.moviesRepository.save(movie)

            const actorList = await Promise.all(
                movieInfo.actors.map(async (actorName, key) => {
                    const actor = await this.getActor(actorName) || await this.createActor(actorName);
                    const moviesActor = new MoviesActors(actor, savedMovieInfo, key + 1)
                    return moviesActor
                })
            );

            const directorList = await Promise.all(
                movieInfo.directors.map(async (directorName, key) => {
                    const director = await this.getDirector(directorName) || await this.createDirector(directorName)
                    const moviesDirector = new MoviesDirectors(director, savedMovieInfo, key + 1)
                    return moviesDirector
                })
            );

            const genreList = await Promise.all(
                movieInfo.genres.map(async (genreName, key) => {
                    const genre = await this.getGenre(genreName) || await this.createGenre(genreName);
                    const moivesGenre = new MoviesGenres(genre, savedMovieInfo, key + 1)
                    return moivesGenre
                })
            );

            await this.moviesActorsRepository.save(actorList)
            await this.moviesDirectorsRepository.save(directorList)
            await this.moviesGenresRepository.save(genreList)

            return savedMovieInfo

        } catch (err) {
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async getMovie(movieId: number): Promise<Movies> {
        return await this.moviesRepository.findOne({
            relations: ['trailers', 'moviesDirectors', 'moviesDirectors.directors', 'moivesGenres', 'moivesGenres.genres', 'moviesActors', 'moviesActors.actors'],
            where: {
                id: movieId
            }
        })
    }


    async getMovieByQuery(query: Partial<QueryInfo>): Promise<Movies[]> {
        console.log('여기로 들어옴')
        console.log(query)
        const whereCondition = {
            ...(query.genres && { genres: query.genres.split(',').map((genre) => ({ genres: { genre } })) }),
            ...(query.actors && { actors: query.actors.split(',').map((name) => ({ name: { name } })) }),
            ...(query.directors && { directors: query.directors.split(',').map((name) => ({ name: { name } })) }),
            ...(query.name && { name: Like(`%${query.name}%`) }),
            ...(query.startdate && { openingDate: MoreThan(new Date(query.startdate)) }),
            ...(query.enddate && { openingDate: LessThan(new Date(query.enddate)) }),
        };

        console.log(whereCondition);
        const genre1 = await this.genresRepository.findOne({ where: { genre: 'action' } })
        console.log(genre1)

        return await this.moviesRepository.find({
            // where: whereCondition,
            where: {
                genres: { genres: { id: 2 } }
            },
            relations: ['trailers', 'directors', 'directors.directors', 'genres', 'genres.genres', 'actors', 'actors.actors'],
            skip: Number(query.skip) || 0,
            take: Number(query.take) || 10,
        });
    }



    async updateMovieInfo(movieInfo: Movies, movieId: number): Promise<UpdateResult> {
        return await this.moviesRepository.update(movieId, movieInfo)
    }

    async deleteMovieInfo(movieId: number): Promise<DeleteResult> {
        return await this.moviesRepository.delete(movieId)
    }

    async createActor(actorInfo: string): Promise<Actors> {
        return await this.actorsRepository.save({ name: actorInfo })
    }

    async getActor(actorName: string): Promise<Actors> {
        return await this.actorsRepository.findOne({ where: { name: actorName } })
    }

    async createDirector(directorInfo: string): Promise<Directors> {
        return await this.directorsRepository.save({ name: directorInfo })
    }

    async getDirector(directorName: string): Promise<Directors> {
        return await this.directorsRepository.findOne({ where: { name: directorName } })
    }

    async createGenre(genres: string): Promise<Genres> {
        return await this.genresRepository.save({ genre: genres })
    }

    async getGenre(genreName: string): Promise<Genres> {
        return await this.genresRepository.findOne({ where: { genre: genreName } })
    }
}
