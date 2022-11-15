import { __prod__ } from './constants';
import { Post } from './entitites/Post';

export default {
	dbName: 'full-typescript-project',
	entities: [Post],
	debug: !__prod__,
	type: 'postgresql',
	allowGlobalContext: true,
};
