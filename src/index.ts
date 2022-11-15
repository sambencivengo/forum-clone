import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entitites/Post';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
	try {
		const orm = await MikroORM.init(mikroOrmConfig);

		const ormFork = orm.em.fork();
		const post = ormFork.create(Post, {
			title: 'first post',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await orm.em.persistAndFlush(post);
	} catch (error) {
		console.log(error);
	}
};

main();
