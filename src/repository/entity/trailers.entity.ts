import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Movies } from './movies.entity';

@Entity({ name: 'tb_trailers' })
export class Trailers extends BaseEntity {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    url: string;

    @Column()
    key: number

    @ManyToOne(() => Movies, (movie) => movie.trailers)
    movie: Movies;
}