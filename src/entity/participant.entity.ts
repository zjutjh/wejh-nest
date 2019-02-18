import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('participant')
export class ParticipantEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('bigint', { name: 'object_id' })
    objectId: string;
    @Column('bigint', { name: 'game_id' })
    gameId: string;
    @Column('int', { default: 0 })
    status: number;
    // @Column('int', { name: 'game_score', default: 0 })
    // gameScore: number;
    @Column('int', { default: 0, name: 'update_time' })
    updateTime: number;
    @Column('int', { default: 0, name: 'create_time' })
    createTime: number;
}
