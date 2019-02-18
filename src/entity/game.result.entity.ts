import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../library/base.entity';

@Entity('game_result')
export class GameResultEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('bigint')
    gameId: string;
    @Column('int')
    score: number;
    @Column('json')
    points: number[];
    @Column('bigint', { name: 'object_id' })
    objectId: string;
    @Column('int', { default: 0, name: 'update_time' })
    updateTime: number;
    @Column('int', { default: 0, name: 'create_time' })
    createTime: number;
}
