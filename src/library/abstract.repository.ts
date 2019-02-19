import {DeepPartial, Repository as TypeormRepository} from 'typeorm';
import {now} from './helper';
import {BaseEntity} from './base.entity';

export interface ObjectLiteral {
  [key: string]: any;
}

export abstract class AbstractRepository<Entity extends BaseEntity> extends TypeormRepository<Entity> {
  get tableName() {
    return this.metadata.tableName;
  }

  async findById(id: string | number): Promise<Entity> {
    id = id.toString();
    return this.findOne({
      where: {id},
    });
  }

  // async listByIds(ids: Array<string | number>, fields: Array<keyof BaseEntity> = []): Promise<Array<Entity>> {
  //     if (fields.length === 0) {
  //         return this.findByIds(ids);
  //     }
  //     return this.findByIds(ids, {
  //         select: fields
  //     });
  // }

  // async deleteById(id: string, soft = true) {
  //     const o = await this.findCityById(id);
  //     o.status = BaseStatus.deleted;
  //     return this.edit(o);
  // }

  async add<T extends DeepPartial<Entity>>(entityLike: T & { id? }): Promise<Entity> {

    const entity = {
      ...entityLike,
      updateTime: now(),
      createTime: now(),
    };
    entity.id = entityLike.id;
    // Object.defineProperty(entityLike, 'createTime', { value: now() });
    // Object.defineProperty(entityLike, 'updateTime', { value: now() });
    await this.save(entity);
    const id = entity.id;
    return this.findById(id);
    // return this.create(entityLike);
  }

  async edit<T extends DeepPartial<Entity>>(entityLike: T & { id? }): Promise<Entity> {
    const entity = {
      ...entityLike,
      updateTime: now(),
      // createTime: now()
    };
    // Object.defineProperty(entityLike, 'updateTime', { value: now() });
    await this.save(entity);
    const id = entity.id;
    return this.findById(id);
  }
}
