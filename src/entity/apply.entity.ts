import { Column, Entity, PrimaryColumn } from 'typeorm';
import { APPLY_STATUS } from '../enum.config';

@Entity('apply')
export class ApplyEntity {
    @PrimaryColumn('bigint')
    id: string;
    @Column('int', { default: 0, name: 'update_time' })
    updateTime: number;
    @Column('int', { default: 0, name: 'create_time' })
    createTime: number;
    @Column('bigint', { name: 'object_id', nullable: false })
    objectId: string;
    @Column('int', { nullable: false })
    type: number;
    @Column('json')
    meta: object;
    @Column('bigint', { name: 'user_id', nullable: false })
    userId: string;
    @Column('int', { default: APPLY_STATUS.WAITING })
    status: APPLY_STATUS;
}
