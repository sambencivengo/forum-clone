import { MikroORM } from '@mikro-orm/postgresql';
import path from 'path';
import { __prod__ } from './constants';
import { User, Post } from './entities';

export default {
	migrations: {
		path: path.join(__dirname, './migrations'), // path to the folder with migrations,
		glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
	},
	dbName: 'forum-clone',
	entities: [Post, User], // Any new entities must be added here
	debug: !__prod__,
	type: 'postgresql',
	allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
