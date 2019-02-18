import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @Column({ unique: true, default: null, nullable: true })
    phone: string;

    @Column({ default: '' })
    password: string;

    @Column('varchar', { name: 'nick_name', default: null, nullable: true, unique: false })
    nickName: string;
    // @Column()
    // province: string;
    @Column('int', { default: 0 })
    city: number;
    @Column('int', { default: 0 })
    rank: number;
    @Column('varchar', { default: null, unique: true, name: 'open_id' })
    openId: string;
    @Column('varchar', { default: null, unique: true, name: 'union_id' })
    unionId: string;
    @Column('varchar', { default: '' })
    avatar: string;
    @Column('int', { default: 1 })
    level: number;
    @Column('int', { default: 0, name: 'play_age' })
    playAge: number;
    @Column({ default: '不详' })
    sex: string;
    @Column({ default: '不详', name: 'play_style' })
    playStyle: string;

    @Column({ default: '未知' })
    rubber: string;

    @Column({ default: '', nullable: true })
    wechat: string;

    @Column('varchar', { name: 'real_name', nullable: true })
    realName: string;

    @PrimaryColumn('bigint')
    id: string;
    @Column('int', { default: 0 })
    status: number;
    @Column('int', { default: 0, name: 'update_time' })
    updateTime: number;
    @Column('int', { default: 0, name: 'create_time' })
    createTime: number;
}
