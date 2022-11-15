import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

const PORT = 8000;
const main = async () => {
	try {
		const orm = await MikroORM.init(mikroOrmConfig);
		await orm.getMigrator().up(); //Runs the migrations before it does anything

		const app = express();

		const apolloServer = new ApolloServer({
			schema: await buildSchema({
				resolvers: [HelloResolver],
				validate: false,
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
