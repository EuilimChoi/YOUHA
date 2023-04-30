import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Movies } from './movies.entity';
import { Directors } from './directors.entity';

@Entity({ name: 'tb_movies_directors' })
export class MoviesDirectors extends BaseEntity {
    constructor(directors: Directors, movie: Movies, key: number
    ) {
        super();
        this.directors = directors;
        this.movies = movie
        this.key = key
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Directors, (director) => director.moviesDirectors)
    directors: Directors

    @ManyToOne(() => Movies, (movie) => movie.directors, {
        onDelete: 'CASCADE', createForeignKeyConstraints: false,
    })
    movies: Movies

    @Column()
    key: number
}