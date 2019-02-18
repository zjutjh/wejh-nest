import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('city')
export class CityEntity {
    @PrimaryColumn('int')
    id: number;
    @Column('varchar')
    name: string;
    @Column('varchar')
    short: string;
    @Column('varchar')
    pinyin: string;
}
