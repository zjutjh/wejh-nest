import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('file')
export class FileEntity {
    @Column('varchar', { unique: true })
    md5: string;
    @Column('varchar', { unique: true })
    filename: string;
    @Column('varchar')
    type: string;
    @Column('json')
    meta: object;

    @PrimaryColumn('bigint')
    id: string;
    @Column('int', { default: 0 })
    status: number;
    @Column('int', { default: 0, name: 'update_time' })
    updateTime: number;
    @Column('int', { default: 0, name: 'create_time' })
    createTime: number;
}
