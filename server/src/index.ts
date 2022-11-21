import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver, PostResolver, UserResolver } from './resolvers';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { ApolloContext } from './types';

const PORT = 8000;
const main = async () => {
	try {
		const orm = await MikroORM.init(mikroOrmConfig);
		await orm.getMigrator().up(); // WARN: Migrations: if table conflicts happen on app start up, comment out and debug

		const app = express();

		const RedisStore = connectRedis(session);
		const redis = new Redis();

		app.set('trust proxy', 1); // NOTE: required for GraphQL studio cookies

		app.use(
			cors<cors.CorsRequest>({
				origin: [
					'http://localhost:3000',
					'https://studio.apollographql.com',
				],
				credentials: true,
			})
		);

		app.use(
			session({
				name: 'qid',
				store: new RedisStore({
					client: redis,
					disableTouch: true,
				}),
				cookie: {
					maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
					httpOnly: true,
					sameSite: 'none',
					// secure: __prod__, // cookie only works in https, which localhost doesn't use
					secure: true,
				},
				saveUninitialized: false,
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
		apolloServer.applyMiddleware({
			app,
			cors: false,
			//  {
			// 	// NOTE: required for redis cookie testing in GraphQL studIo
			// 	credentials: true,
			// 	origin: 'https://studio.apollographql.com',
			// },
		});

		app.listen(PORT, () => {
			console.log(`Server started and listing on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

main();
