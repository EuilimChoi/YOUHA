import { BaseEntity } from 'src/repository/entity/base.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Trailers } from './trailers.entity';
import { MoviesDirectors } from './moviesDirectors.entitiy';
import { MoviesGenres } from './moviesGenres.entity';
import { MoviesActors } from './moviesActors.entity';

@Entity({ name: 'tb_movies' })
export class Movies extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'origin_name' })
    originName: string;

    @Column({ name: 'opening_date' })
    openingDate: Date;

    @Column({ name: 'poster_image' })
    posterImage: string;

    @Column()
    synopsis: string;

    @Column()
    playtime: string;

    @Column()
    score: number

    @OneToMany(() => Trailers, (trailer) => trailer.movie)
    trailers: Trailers[];

    @OneToMany(() => MoviesDirectors, (moviesDirectors) => moviesDirectors.movies)
    directors: MoviesDirectors[];

    @OneToMany(() => MoviesGenres, (moviesGenres) => moviesGenres.movies)
    genres: MoviesGenres[];

    @OneToMany(() => MoviesActors, (moviesActors) => moviesActors.movies)
    actors: MoviesActors[];
}
