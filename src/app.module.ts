import {Logger, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {glob} from 'glob';
import {GqlModuleOptions, GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {RedisModule} from './library/redis/redis.module';
import {AuthMiddleware} from './middleware/auth.middleware';
import {SessionMiddleware} from './middleware/session.middleware';
import {addCatchUndefinedToSchema, addErrorLoggingToSchema} from 'graphql-tools';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as config from 'config';

function loadClass(path: string | string[]) {
  if (!Array.isArray(path)) {
    const classes = glob.sync(__dirname + `/${path}/*.{ts,js}`) as Array<string>;
    // console.log(classes);
    return classes.reduce((result, c) => {
      result.push(...Object.values(require(c)));
      return result;
    }, []);
  } else {
    const res = [];
    for (const p of path) {
      res.push(...loadClass(p));
    }
    // console.log(res);
    return res;
  }

}

// function loadRepository(path: string) {
//     const classes = glob.sync(__dirname + `/${path}/*.{ts,js}`) as Array<string>;
//     // console.log(classes);
//     return classes.reduce((result, c) => {
//         [...Object.values(require(c))].forEach((repository)=>{
//
//         });
//
//         return result;
//     }, []);
// }

const graphqlConfig: GqlModuleOptions = {
  typePaths: [__dirname + '/../graphql/*.graphqls'],
  installSubscriptionHandlers: true,
  definitions: {
    path: join(process.cwd(), 'src/graphql.schema.ts'),
    outputAs: 'interface',
  },
  transformSchema: (schema) => {
    addCatchUndefinedToSchema(schema);
    addErrorLoggingToSchema(schema, Logger);
    return schema;
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  // mockEntireSchema: true,
  // mocks: {
  //     String: () => 'test'
  // }
};
const DatabaseModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: config.get('db').host,
  port: config.get('db').port,
  username: config.get('db').user,
  password: config.get('db').password,
  database: config.get('db').database,
  charset: 'utf8mb4',
  synchronize: true, // process.env.NODE_ENV !== 'production',
  // logging: true,
  entities: [
    __dirname + '/entity/*.entity{.js,.ts}',
  ],
});

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature(loadClass(['entity', 'repository'])), GraphQLModule.forRoot(graphqlConfig), RedisModule],
  providers: loadClass(['service', 'graphql', 'resolver']),
  // exports: loadClass('service')
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware, AuthMiddleware)
      .forRoutes('*');
  }
}
