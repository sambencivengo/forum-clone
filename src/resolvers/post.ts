import { Post } from '../entities';
import { MyContext } from 'src/types';
import { Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export class PostResolver {
	@Query(() => [Post]) // Arrays in GraphQL are an array with the type inside
	post(@Ctx() { em }: MyContext): Promise<Post[]> {
		return em.find(Post, {});
	}
}
