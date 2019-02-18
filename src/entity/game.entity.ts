import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GAME_TYPE } from '../enum.config';

@Entity('game')
export class GameEntity {
    @PrimaryColumn('bigint')
    id: string;
    @PrimaryColumn('bigint', { name: 'next_game_id' })
    nextGameId: string;
    @Column('bigint', { name: 'match_id' })
    matchId: string;

    @Column('bigint', { name: 'winner_id', default: 0 })
    winnerId: string;

    @Column('int', { default: 1 })
    round: number;  // 轮次
    @Column('int', { default: 0 })
    level: number;
    @Column('int', { default: 0 })
    type: GAME_TYPE;
    @Column('int', { default: 0 })
    status: number;
    @Column('int', { default: 0, name: 'group_id' })
    groupId: number;
    @Column('int', { default: 0, name: 'update_time' })
    updateTime: number;
    @Column('int', { default: 0, name: 'create_time' })
    createTime: number;
}
