import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
	try {
		const orm = await MikroORM.init(mikroOrmConfig);
		await orm.getMigrator().up(); //Runs the migrations before it does anything

		const ormFork = orm.em.fork();
		const post = ormFork.create(Post, {
			title: 'first posts',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	} catch (error) {
		console.log(error);
	}
};

main();
