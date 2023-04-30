import { Controller, Post, Body, Query, Put, Param, Delete, Get, HttpException, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movies } from 'src/repository/entity/movies.entity';
import { DeleteResult } from 'typeorm';
import { MovieInfoDTO } from './interface/dto';


@Controller('/api/v1/movies')
export class MovieController {
    constructor(private movieservice: MovieService) { }

    @Post('/')
    async createMovie(@Body() movieInfo: MovieInfoDTO) {
        return await this.movieservice.createMovie(movieInfo)
    }

    @Get()
    async getMovieByQuery(@Query() query: Partial<QueryInfo>): Promise<MovieInfoDTO[]> {
        return await this.movieservice.getMovieByQuery(query)
    }

    @Get('/:movieId')
    async getMovieDetail(@Param('movieId') movieId: number): Promise<any> {
        const response = await this.movieservice.getMovieDetail(movieId)
        if (response == null) {
            new HttpException('no content', HttpStatus.NO_CONTENT)
        }
        return response
    }

    @Put('/:movieId')
    async updateMovie(@Body() movieInfo: MovieInfoDTO, @Param('movieId') movieId: number): Promise<Movies> {
        return await this.movieservice.updateMovie(movieInfo, movieId)
    }

    @Delete('/:movieId')
    async deleteMovie(@Param('movieId') movieId: number): Promise<string> {
        return await this.movieservice.deleteMovie(movieId)
    }

}
