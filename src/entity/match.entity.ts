import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MATCH_STATUS } from '../enum.config';

@Entity('match')
export class MatchEntity {
    @Column('varchar', { default: '' })
    name: string;
    @Column('int', { default: 0 })
    start: number;
    @Column('int', { default: 0 })
    end: number;
    @Column('int', { default: 0, name: 'sign_start' })
    signStart: number;
    @Column('int', { default: 0, name: 'sign_end' })
    signEnd: number;
    @Column('varchar', { default: '' })
    address: string;
    @Column('text', { nullable: true })
    description: string;
    @Column('text', { nullable: true })
    rule: string;
    @Column('int', { default: 0 })
    max: number;
    @Column('int', { default: 0 })
    city: number;
    @Column('json')
    levels: Array<number>;
    @Column('int', { name: 'match_type', default: 0 })
    matchType: number;
    @Column('varchar', { default: '' })
    sponsor: string;

    @Column('varchar', { default: '' })
    host: string;

    @Column('int', { default: 0 })
    fee: number;
    @Column('json')
    extend: { banner: string };

    @PrimaryColumn('bigint')
    id: string;
    @Column('int', { default: 0 })
    status: MATCH_STATUS;
    @Column('int', { default: 0, name: 'update_time' })
    updateTime: number;
    @Column('int', { default: 0, name: 'create_time' })
    createTime: number;

    @Column('int', { default: 2, name: 'group_wincount' })
    groupWinCount: number; // 小组赛前几进入淘汰赛, 大于等于1
    @Column('int', { default: 4, name: 'per_group_count' })
    perGroupCount: number; // 小组赛人数，0代表没有小组赛
}
