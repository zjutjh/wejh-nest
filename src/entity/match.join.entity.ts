import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('match_join')
export class MatchJoinEntity {
    @Column('bigint', { name: 'object_id' })
    objectId: string;
    @Column('bigint', { name: 'match_id' })
    matchId: string;
    @Column('int', { default: 0, name: 'join_rank' })
    joinRank: number;
    @Column('int', { default: 0 })
    level: number; // 级别分区
    @Column('int', { default: 0 })
    winCnt: number; // 胜场
    @Column('int', { default: 0 })
    groupId: number;
    @PrimaryColumn('bigint')
    id: string;
    @Column('int', { default: 0 })
    status: number;
    @Column('int', { default: 0, name: 'update_time' })
    updateTime: number;
    @Column('int', { default: 0, name: 'create_time' })
    createTime: number;

}
