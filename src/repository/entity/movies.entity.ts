
import { BaseEntity } from 'src/repository/entity/base.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Trailers } from './trailers.entity';
import { Directors } from './directors,entity';
import { Genres } from './genres.entity';
import { Actors } from './actors.entity';

@Entity({ name: 'tb_movies' })
export class Movies extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'origin_name' })
    originName: string;

    @Column({ name: 'opening_date' })
    openingDate: Date;

    @Column({ name: 'poster_image' })
    posterImage: string;

    @Column()
    synopsis: string;

    @Column()
    playtime: string;

    @Column()
    score: number

    @OneToMany(() => Trailers, (trailer) => trailer.movie)
    trailers: Trailers[];

    @ManyToMany(() => Directors)
    @JoinTable({ name: 'movies_director' })
    directors: Directors[];

    @ManyToMany(() => Genres)
    @JoinTable({ name: 'movies_genres' })
    genres: Genres[];

    @ManyToMany(() => Actors)
    @JoinTable({ name: 'movies_actors' })
    actors: Actors[];
}
