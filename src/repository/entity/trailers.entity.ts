import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movies } from './movies.entity';

@Entity({ name: 'tb_trailers' })
export class Trailers extends BaseEntity {
    constructor(url: string, movie: Movies, key: number
    ) {
        super();
        this.url = url;
        this.movie = movie
        this.key = key
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    key: number

    @ManyToOne(() => Movies, (movie) => movie.trailers, {
        onDelete: 'CASCADE', createForeignKeyConstraints: false,
    })
    movie: Movies;
}