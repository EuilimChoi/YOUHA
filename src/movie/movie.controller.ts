import { Controller, Post, Body, Query, Put, Param, Delete, Get } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movies } from 'src/repository/entity/movies.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { MovieInfoDTO } from './interface/dto';

@Controller('/api/v1/movies')
export class MovieController {
    constructor(private movieservice: MovieService) { }

    @Post('/')
    async createMovie(@Body() movieInfo: MovieInfoDTO) {
        return this.movieservice.createMovie(movieInfo)
    }

    @Get()
    async getMovieByQuery(@Query() query: Partial<QueryInfo>): Promise<Movies[]> {
        return this.movieservice.getMovieByQuery(query)
    }

    @Get('/:movieId')
    async getMovieDetail(@Param('movieId') movieId: number): Promise<Movies> {
        return this.movieservice.getMovieDetail(movieId)
    }

    @Put('/:movieId')
    async updateMovie(@Body() movieInfo: Movies, @Param() movieId: number): Promise<UpdateResult> {
        return this.movieservice.updateMovie(movieInfo, movieId)
    }

    @Delete('/:movieId')
    async deleteMovie(@Param() movieId: number): Promise<DeleteResult> {
        return this.movieservice.deleteMovie(movieId)
    }

}
