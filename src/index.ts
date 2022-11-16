import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver, PostResolver, UserResolver } from './resolvers';
import session from 'express-session';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';
import { ApolloContext } from './types';

const RedisStore = connectRedis.default(session);
const redisClient = redis.createClient();

const PORT = 8000;
const main = async () => {
	try {
		const orm = await MikroORM.init(mikroOrmConfig);
		await orm.getMigrator().up(); // WARN: Migrations: if table conflicts happen on app start up, comment out and debug

		const app = express();

		app.use(
			session({
				name: 'qid',
				store: new RedisStore({
					client: redisClient as any, // To prevent types breaking from @types/connect-redis
					disableTouch: true,
				}),
				cookie: {
					maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
					httpOnly: true,
					sameSite: 'lax',
					secure: __prod__, // cookie only works in https, which localhost doesn't use
				},
				secret: ';kajbsdk;jabsd;kjabsd', //TODO: env variable
				resave: false,
			})
		);

		const apolloServer = new ApolloServer({
			schema: await buildSchema({
				resolvers: [HelloResolver, PostResolver, UserResolver],
				validate: false,
			}),
			// NOTE: context is a special object that is accessible by all of your resolvers
			context: ({ req, res }): ApolloContext => ({
				em: orm.em,
				req,
				res /* adding req and res allows apollo to access sessions via resolvers */,
			}),
		});

		await apolloServer.start();
		apolloServer.applyMiddleware({ app });

		app.listen(PORT, () => {
			console.log(`Serer started and listing on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

main();
