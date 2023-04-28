import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actors } from './entity/actors.entity';
import { Movies } from './entity/movies.entity';
import { Directors } from './entity/directors.entity';
import { Genres } from './entity/genres.entity';
import { Trailers } from './entity/trailers.entity';
import { MoviesActors } from './entity/moviesActors.entity';
import { MoviesDirectors } from './entity/moviesDirectors.entitiy';
import { MoviesGenres } from './entity/moviesGenres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actors, Movies, Directors, Genres, Trailers, MoviesActors, MoviesDirectors, MoviesGenres])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule { }
