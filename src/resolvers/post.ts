import { Post } from '../entities';
import { MyContext } from 'src/types';
import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';

@Resolver()
export class PostResolver {
	@Query(() => [Post]) // Arrays in GraphQL are an array with the type inside
	posts(@Ctx() { em }: MyContext): Promise<Post[]> {
		return em.find(Post, {});
	}

	@Query(() => Post, { nullable: true }) // Arrays in GraphQL are an array with the type inside
	post(
		@Arg('id', () => Int) id: number,
		@Ctx() { em }: MyContext
	): Promise<Post | null> {
		return em.findOne(Post, { id });
	}
}
