import {Mutation} from '@nestjs/graphql';
import {getNamespace} from 'cls-hooked';

@Mutation()
export class GraphqlMutation {

  constructor() {
  }

  private get user() {
    const session = getNamespace('session');
    return session.get('user');
  }
}
