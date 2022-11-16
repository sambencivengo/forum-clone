import { User } from '../entities';
import { EntityManagerType } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';

// Alternative way to use @Arg decorators for arguments
@InputType()
class UsernamePasswordInput {
	@Field()
	username: string;
	@Field()
	password: string;
}

@Resolver()
export class UserResolver {
	@Mutation(() => String)
	register(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() { em }: EntityManagerType
	) {
		const { password, username } = options;
		const hashedPassword = password;
		// Hash password
		em.create(User, { username, password: hashedPassword });
	}
}
