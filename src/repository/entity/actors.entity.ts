import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity'
import { MoviesActors } from './moviesActors.entity';

@Entity({ name: 'tb_actors' })
export class Actors extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => MoviesActors, (moviesActors) => moviesActors.actors)
    MoviesGenre: MoviesActors[]
}