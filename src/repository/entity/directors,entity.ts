import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'tb_directors' })
export class Directors extends BaseEntity {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;
}