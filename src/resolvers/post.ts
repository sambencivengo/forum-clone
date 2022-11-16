import { Post } from '../entities';
import { MyContext } from 'src/types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class PostResolver {
	@Query(() => [Post]) // Arrays in GraphQL are an array with the type inside
	posts(@Ctx() { em }: MyContext): Promise<Post[]> {
		return em.find(Post, {});
	}

	@Query(() => Post, { nullable: true })
	post(
		@Arg('id') id: number,
		@Ctx() { em }: MyContext
	): Promise<Post | null> {
		return em.findOne(Post, { id });
	}

	// without post and flush, the browser graphql call will error out due to returning NULL
	@Mutation(() => Post)
	async createPost(
		@Arg('title') title: string,
		@Ctx() { em }: MyContext
	): Promise<Post> {
		const post = em.create(Post, { title });
		await em.persistAndFlush(post); // just like a controller and route, this will post and flush in order to save to the DB
		return post;
	}

	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg('id') id: number, // Any other args will be a second @Arg call
		@Arg('title', () => String, { nullable: true }) title: string,
		@Ctx() { em }: MyContext
	): Promise<Post | null> {
		const post = await em.findOne(Post, { id });
		if (!post) {
			return null;
		}

		if (title) post.title = title;
		await em.persistAndFlush(post);
		return post;
	}
}
