import { Args, Query } from '@nestjs/graphql';
import { formatList, safeNumber } from '../library/helper';

import { getNamespace } from 'cls-hooked';
import { MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Query()
export class GraphqlQuery {
  constructor() {}

  private get user() {
    const session = getNamespace('session');
    return session.get('user');
  }
}
