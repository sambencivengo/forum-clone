import { MikroORM } from '@mikro-orm/postgresql';
import path from 'path';
import { __prod__ } from './constants';
import { Post } from './entities/Post';

export default {
	migrations: {
		path: path.join(__dirname, './migrations'), // path to the folder with migrations,
		glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
	},
	dbName: 'forum-clone',
	entities: [Post],
	debug: !__prod__,
	type: 'postgresql',
	allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
