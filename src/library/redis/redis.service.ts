import {Injectable} from '@nestjs/common';
import * as R from 'ioredis';
import * as config from 'config';

type Redis = R.Redis;

@Injectable()
export class RedisService {
  private readonly config;
  private pools: Redis[] = [];

  constructor() {
    this.config = {
      port: config.get('redis').port,          // Redis port
      host: config.get('redis').host,   // Redis host
      family: 4,           // 4 (IPv4) or 6 (IPv6)
      // password: 'auth',
      db: 0,
    };
  }

  async createRedis(db = 0) {
    const r = new R(this.config);
    await r.select(db);
    return r;
  }

  async getRedis(name: string): Promise<Redis> {
    if (!this.pools[name]) {
      const db = config.get('redis')[name];
      this.pools[name] = await this.createRedis(db || 0);
    }

    return this.pools[name];
  }
}
