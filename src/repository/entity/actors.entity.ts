import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { MoviesActors } from './moviesActors.entity';

@Entity({ name: 'tb_actors' })
export class Actors extends BaseEntity {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @OneToMany(() => MoviesActors, (moviesActors) => moviesActors.actors)
    MoviesGenre: MoviesActors[]
}