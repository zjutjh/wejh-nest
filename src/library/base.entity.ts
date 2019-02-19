import {Column, PrimaryColumn} from 'typeorm';

// enum BaseStatus {
//     normal = 0,
//     deleted = 10,
//
// }

export class BaseEntity {
  @PrimaryColumn('bigint')
  id: string | number;
  @Column('int', {default: 0})
  status: number;
  @Column('int', {default: 0, name: 'update_time'})
  updateTime: number;
  @Column('int', {default: 0, name: 'create_time'})
  createTime: number;

}
