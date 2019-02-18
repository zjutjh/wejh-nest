import {Args, Query} from '@nestjs/graphql';
import {formatList, safeNumber} from '../library/helper';

import {UserEntity} from '../entity/user.entity';
import {getNamespace} from 'cls-hooked';
import {USER_STATUS} from '../enum.config';
import {MoreThan} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';


@Query()
export class GraphqlQuery {
    constructor() {
    }


    private get user() {
        const session = getNamespace('session');
        return session.get('user');
    }
}
