import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Actors } from './actors.entity';
import { Movies } from './movies.entity';

@Entity({ name: 'tb_movies_actors' })
export class MoviesActors extends BaseEntity {
    constructor(actor: Actors, movie: Movies, key: number
    ) {
        super();
        this.actors = actor;
        this.movies = movie
        this.key = key
    }
    @Column({ primary: true, generated: true })
    id: number;

    @ManyToOne(() => Actors, (actor) => actor.id)
    actors: Actors;

    @ManyToOne(() => Movies, (movie) => movie.actors)
    movies: Movies

    @Column()
    key: number
}