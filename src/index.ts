import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';

const PORT = 8000;
const main = async () => {
	try {
		const orm = await MikroORM.init(mikroOrmConfig);
		await orm.getMigrator().up(); //Runs the migrations before it does anything

		const app = express();

		app.get('/', (_, res) => {
			res.send('hello');
		});

		app.listen(PORT, () => {
			console.log(`Serer started and listing on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

main();
