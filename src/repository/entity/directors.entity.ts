import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity'
import { MoviesDirectors } from './moviesDirectors.entitiy';

@Entity({ name: 'tb_directors' })
export class Directors extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => MoviesDirectors, (moviesDirectors) => moviesDirectors.directors)
    moviesDirectors: MoviesDirectors[]
}