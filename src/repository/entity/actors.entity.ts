import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'tb_actors' })
export class Actors extends BaseEntity {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;
}