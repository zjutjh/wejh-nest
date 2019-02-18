import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { getNamespace } from 'cls-hooked';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return async (req: any, res, next) => {
            const token: string = req.headers.authorization;
            let user = null;
            let method = '';

            let check = true;
            try {
                const graphqlObject = gql(`${req.body.query}`);
                // console.log(graphqlObject);
                method = graphqlObject.definitions[0].selectionSet.selections[0].name.value;

            } catch (e) {
                res.send(new GraphQLError('请先登录'));
            }
            try {

                user = jwt.verify(token, config.get('secret'));
                const userId = user['id'];
                const session = getNamespace('session');
                // const u = await this.userService.findById(userId);
                await session.set('user', user);
            } catch (e) {

            } finally {
                const unauthorizedMethods = [];
                if (check && !user && method.length > 0 && !unauthorizedMethods.includes(method)) {
                    res.send(new GraphQLError('请先登录'));
                } else {
                    next();
                }

            }
        };
    }
}
