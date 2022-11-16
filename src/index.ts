import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver, PostResolver, UserResolver } from './resolvers';
import session from 'express-session';
const redis = require('redis'); // WARN: TypeScript: converting to import will break types
const RedisStore = require('connect-redis')(session); // WARN: TypeScript: converting to import will break types

const redisClient = redis.createClient();

const PORT = 8000;
const main = async () => {
	try {
		const orm = await MikroORM.init(mikroOrmConfig);
		await orm.getMigrator().up(); // WARN: Migrations: if table conflicts happen on app start up, comment out and debug

		const app = express();

		app.use(
			session({
				store: new RedisStore({ client: redisClient }),
				saveUninitialized: false,
				secret: 'keyboard cat',
				resave: false,
			})
		);

		const apolloServer = new ApolloServer({
			schema: await buildSchema({
				resolvers: [HelloResolver, PostResolver, UserResolver],
				validate: false,
			}),
			context: () => ({ em: orm.em }), // Special object that is accessible by all of your resolvers
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
