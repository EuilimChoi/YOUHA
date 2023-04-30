import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryService } from '../repository/repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movies } from '../repository/entity/movies.entity';
import { Actors } from '../repository/entity/actors.entity';
import { Genres } from '../repository/entity/genres.entity';
import { Trailers } from '../repository/entity/trailers.entity';
import { Directors } from '../repository/entity/directors.entity';
import { MoviesActors } from '../repository/entity/moviesActors.entity';
import { MoviesGenres } from '../repository/entity/moviesGenres.entity';
import { MoviesDirectors } from '../repository/entity/moviesDirectors.entitiy';
import { MovieInfoDTO } from 'src/movie/interface/dto';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

describe('RepositoryService', () => {
    let service: RepositoryService;
    let moviesRepository: Repository<Movies>;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RepositoryService,
                {
                    provide: getRepositoryToken(Movies),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Actors),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Genres),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Trailers),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Directors),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(MoviesActors),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(MoviesGenres),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(MoviesDirectors),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<RepositoryService>(RepositoryService);
        moviesRepository = module.get<Repository<Movies>>(getRepositoryToken(Movies));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });


    const movieInfo: MovieInfoDTO = {
        name: 'Avengers: Endgame',
        originName: 'Avengers: Endgame',
        posterImage: 'https://example.com/poster.jpg',
        openingDate: '2019-04-26T00:00:00.000Z',
        synopsis: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos\' actions and restore order to the universe.',
        playtime: "181",
        score: 8.4,
        actors: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth', 'Scarlett Johansson', 'Jeremy Renner', 'Don Cheadle', 'Paul Rudd', 'Brie Larson', 'Karen Gillan', 'Danai Gurira', 'Benedict Wong', 'Jon Favreau', 'Bradley Cooper', 'Gwyneth Paltrow', 'Josh Brolin'],
        genres: ['Action', 'Adventure', 'Drama'],
        directors: ['Anthony Russo', 'Joe Russo'],
        trailers: ['https://example.com/trailer1.mp4', 'https://example.com/trailer2.mp4'],
    };

    describe('createMovie', () => {

        it('should create a new movie with valid input', async () => {
            const movie = plainToClass(Movies, movieInfo);
            jest.spyOn(service, 'createMovie').mockImplementation(async () => movie);
            expect(await service.createMovie(movieInfo)).toEqual(movie);
        });

        it('should return err when server err', async () => {
            jest.spyOn(service, 'createMovie').mockRejectedValue(new InternalServerErrorException());
            await expect(service.createMovie(movieInfo)).rejects.toThrowError(InternalServerErrorException);
        })
    });

    describe('getMovie', () => {
        it('should return a movie', async () => {
            jest.spyOn(service, 'getMovie').mockImplementation(async () => movieInfo);
            expect(await service.getMovie(1)).toEqual(movieInfo);
        });

        it('should return err when server err', async () => {
            jest.spyOn(service, 'getMovie').mockRejectedValue(new InternalServerErrorException());
            await expect(service.getMovie(1)).rejects.toThrowError(InternalServerErrorException);
        })
    });

    describe('getMovie', () => {
        it('should return a movie', async () => {
            jest.spyOn(service, 'getMovie').mockImplementation(async () => movieInfo);
            expect(await service.getMovie(1)).toEqual(movieInfo);
        });

        it('should return err when server err', async () => {
            jest.spyOn(service, 'getMovie').mockRejectedValue(new InternalServerErrorException());
            await expect(service.getMovie(1)).rejects.toThrowError(InternalServerErrorException);
        })
    });

    describe('getMovieByQuery', () => {


        it('should return an empty array when no query condition is provided', async () => {
            jest.spyOn(moviesRepository, 'find').mockResolvedValue([]);

            const result = await service.getMovieByQuery({});

            expect(result).toEqual([]);
            expect(moviesRepository.find).toHaveBeenCalledWith({
                where: {},
                relations: ['trailers', 'directors.directors', 'genres.genres', 'actors.actors'],
                skip: 0,
                take: 10,
            });
        });

        it('should return an matched movie with query', async () => {
            const movie = plainToClass(Movies, movieInfo);
            jest.spyOn(moviesRepository, 'find').mockResolvedValue([movie]);
            console.log(movieInfo)
            const result = await service.getMovieByQuery({ name: movieInfo.name });

            expect(result).toEqual([movie]);
            // expect(moviesRepository.find).toHaveBeenCalledWith({
            //     where: { name: movieInfo.name },
            //     relations: ['trailers', 'directors.directors', 'genres.genres', 'actors.actors'],
            //     skip: 0,
            //     take: 10,
            // });
        })


    });


});
