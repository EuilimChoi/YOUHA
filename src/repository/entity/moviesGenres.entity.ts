import { BaseEntity, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Movies } from './movies.entity';
import { Genres } from './genres.entity';

@Entity({ name: 'tb_movies_genres' })
export class MoviesGenres extends BaseEntity {

    constructor(genres: Genres, movie: Movies, key: number
    ) {
        super();
        this.genres = genres;
        this.movies = movie;
        this.key = key
    }

    @Column({ primary: true, generated: true })
    id: number;

    @ManyToOne(() => Genres, (genre) => genre.moviesGenre)
    genres: Genres;

    @ManyToOne(() => Movies, (movie) => movie.genres, {
        onDelete: 'CASCADE', createForeignKeyConstraints: false,
    })
    movies: Movies

    @Column()
    key: number
}