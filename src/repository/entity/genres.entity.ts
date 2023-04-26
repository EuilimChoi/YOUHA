import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'tb_genres' })
export class Genres extends BaseEntity {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    genre: string;
}