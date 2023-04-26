import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { RepositoryModule } from './repository/repository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorModule } from './actor/actor.module';
import databaseConfig from 'src/config/database.config'

@Module({
  imports: [MovieModule, RepositoryModule, TypeOrmModule.forRoot(databaseConfig), ActorModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
