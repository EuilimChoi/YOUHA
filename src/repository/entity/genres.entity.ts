import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { MoviesGenres } from './moviesGenres.entity';

@Entity({ name: 'tb_genres' })
export class Genres extends BaseEntity {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    genre: string;

    @OneToMany(() => MoviesGenres, (moviesGenres) => moviesGenres.genres)
    moviesGenre: MoviesGenres[]
}