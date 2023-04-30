import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity'
import { MoviesGenres } from './moviesGenres.entity';

@Entity({ name: 'tb_genres' })
export class Genres extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    genre: string;

    @OneToMany(() => MoviesGenres, (moviesGenres) => moviesGenres.genres)
    moviesGenre: MoviesGenres[]
}