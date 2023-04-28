import { Injectable, InternalServerErrorException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './entity/movies.entity';
import { DeleteResult, Repository, UpdateResult, Like, MoreThan, LessThan, Between, FindOptions, FindOptionsWhere, In } from 'typeorm';
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
            where: {
                id: movieId
            },
            relations: ['trailers', 'directors', 'directors.directors', 'genres', 'genres.genres', 'actors', 'actors.actors'],
        })
    }


    async getMovieByQuery(query: Partial<QueryInfo>): Promise<any> {
        console.log(query)

        const sortMovieList = (array: number[], count: number) => {
            const counter = {};

            for (const num of array) {
                counter[num] = counter[num] ? counter[num] + 1 : 1;
            }

            const duplicates = [];
            for (const num in counter) {
                if (counter[num] >= count) {
                    duplicates.push(Number(num));
                }
            }
            return duplicates;
        }


        const genreMovieList = async (genres: string) => {
            const genre = genres.split(',').map((genre) => ({ genre: genre }))
            const getmovie = await this.moviesGenresRepository.find({ where: { genres: genre }, relations: ['movies'] },)
            const movieList = getmovie.map((movie) => movie.movies.id)
            const sortedMovieList = sortMovieList(movieList, genre.length)
            return sortedMovieList
        }

        const actorMovieList = async (actors: string) => {
            const actor = actors.split(',').map((actor) => ({ name: actor }))
            const getmovie = await this.moviesActorsRepository.find({ where: { actors: actor }, relations: ['movies'] },)
            const movieList = getmovie.map((movie) => movie.movies.id)
            const sortedMovieList = sortMovieList(movieList, actor.length)
            return sortedMovieList

        }

        const directorMovieList = async (directors: string) => {
            const director = directors.split(',').map((director) => ({ name: director }))
            const getmovie = await this.moviesDirectorsRepository.find({ where: { directors: director }, relations: ['movies'] },)
            const movieList = getmovie.map((movie) => movie.movies.id)
            const sortedMovieList = sortMovieList(movieList, director.length)
            return sortedMovieList

        }

        const movieCondition = {
            ...(query.genres && { genres: await genreMovieList(query.genres) }),
            ...(query.actors && { actors: await actorMovieList(query.actors) }),
            ...(query.directors && { directors: await directorMovieList(query.directors) }),
        };

        const checkEmpty = Object.keys(movieCondition).length !== 0;

        const intersection = checkEmpty && Object.values(movieCondition).reduce((accumulator, current) =>
            accumulator.filter(value => current.includes(value)))

        const whereCondition = {
            ...(intersection && { id: In(intersection) }),
            ...(query.name && { name: Like(`%${query.name}%`) }),
            ...(query.startdate && { openingDate: MoreThan(new Date(query.startdate)) }),
            ...(query.enddate && { openingDate: LessThan(new Date(query.enddate)) }),
        };

        const movieId = await this.moviesRepository.find({
            where: whereCondition,
            relations: ['trailers', 'directors', 'directors.directors', 'genres', 'genres.genres', 'actors', 'actors.actors'],
            skip: Number(query.skip) || 0,
            take: Number(query.take) || 10,
        })

        return movieId

    }

    async updateMovieInfo(movieInfo: MovieInfoDTO, movieId: number): Promise<Movies> {
        await this.deleteMovieInfo(movieId)
        return await this.createMovie(movieInfo)
    }

    //
    async deleteMovieInfo(movieId: number): Promise<DeleteResult> {
        console.log("movieId", movieId)
        return await this.moviesRepository.delete(movieId)
    }

    //
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
