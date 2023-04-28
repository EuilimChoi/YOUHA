import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MoviesDirectors } from './moviesDirectors.entitiy';

@Entity({ name: 'tb_directors' })
export class Directors extends BaseEntity {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @OneToMany(() => MoviesDirectors, (moviesDirectors) => moviesDirectors.directors)
    moviesDirectors: MoviesDirectors[]
}