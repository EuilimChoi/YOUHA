import { BaseEntity, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
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


    @Column()
    key: number

    @ManyToOne(() => Actors, (actor) => actor.name)
    actors: Actors;

    @ManyToOne(() => Movies, (movie) => movie.actors, {
        onDelete: 'CASCADE', createForeignKeyConstraints: false,
    })
    movies: Movies
}