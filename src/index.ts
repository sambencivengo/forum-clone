import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entitites/Post';

const main = async () => {
	try {
		const orm = await MikroORM.init({
			dbName: 'full-typescript-project',
			entities: [Post],
			debug: !__prod__,
			type: 'postgresql',
			allowGlobalContext: true,
		});

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
