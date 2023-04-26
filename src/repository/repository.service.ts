import { Injectable, InternalServerErrorException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './entity/movies.entity';
import { DeleteResult, Repository, UpdateResult, Like, MoreThan, LessThan, Between, FindOptions, FindOptionsWhere } from 'typeorm';
import { Actors } from './entity/actors.entity';
import { Genres } from './entity/genres.entity';
import { Trailers } from './entity/trailers.entity';
import { Directors } from './entity/directors,entity';

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
    ) { }

    async createMovie(movieInfo: Partial<Movies>): Promise<Movies> {
        try {
            return await this.moviesRepository.save(movieInfo)
        } catch (err) {
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async getMovie(movieId: number): Promise<Movies> {
        return await this.moviesRepository.findOneOrFail({
            relations: ['trailer', 'director', 'genres', 'actors'],
            where: {
                id: movieId
            }
        })
    }

    async getMovieList(): Promise<Movies[]> { //페이징 있어야함
        return await this.moviesRepository.find()
    }

    async getMovieByQuery(query: Partial<QueryInfo>): Promise<Movies[]> {
        let paging = { skip: 0, take: 10 }
        let whereCondition = {}

        for (const key in query) {
            const makeList = query[key].split(',')
            if (key === 'genres') {
                whereCondition[key] = makeList.map((each: string) => { return { genre: each } })
            } else if (key === 'skip') {
                paging[key] = Number(query[key])
            }
            else if (key === 'take') {
                paging[key] = Number(query[key])
            }
            else if (key === 'actors' || key === 'directors') {
                whereCondition[key] = makeList.map((each: string) => { return { name: each } })
            }
            else if (key === 'name') {
                whereCondition[key] = Like(`%${query[key]}%`)
            }
        }

        if ('startdate' in query && 'enddate' in query) {
            whereCondition['openingDate'] = Between(new Date(query.startdate), new Date(query.enddate))
        } else if ('startdate' in query) {
            whereCondition['openingDate'] = MoreThan(new Date(query.startdate))
        } else if ('enddate' in query) {
            whereCondition['openingDate'] = LessThan(new Date(query.enddate))
        }

        console.log(whereCondition)



        return await this.moviesRepository.find({
            ...paging,
            relations: ['trailers', 'directors', 'genres', 'actors'],
            where: whereCondition
        })
    } // 한번에 조회가 되는 로직을 생각해보자


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
        return await this.actorsRepository.findOneOrFail({ where: { name: actorName } })
    }

    async createDirector(directorInfo: string): Promise<Directors> {
        return await this.directorsRepository.save({ name: directorInfo })
    }

    async getDirector(directorName: string): Promise<Directors> {
        return await this.directorsRepository.findOneOrFail({ where: { name: directorName } })
    }

    async createGenre(genres: string): Promise<Genres> {
        return await this.genresRepository.save({ genre: genres })
    }

    async getGenre(genreName: string): Promise<Genres> {
        return await this.genresRepository.findOneOrFail({ where: { genre: genreName } })
    }
}
