import { MikroORM } from '@mikro-orm/postgresql';
import { __prod__ } from './constants';
import { Post } from './entities/Post';

export default {
	dbName: 'full-typescript-project',
	entities: [Post],
	debug: !__prod__,
	type: 'postgresql',
	allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
