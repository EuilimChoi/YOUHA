import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
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

    @Column({ primary: true, generated: true })
    id: number;

    @ManyToOne(() => Directors, (director) => director.moviesDirectors)
    directors: Directors

    @ManyToOne(() => Movies, (movie) => movie.directors)
    movies: Movies

    @Column()
    key: number
}