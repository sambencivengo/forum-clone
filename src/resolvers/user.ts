import { User } from '../entities';
import { EntityManagerType } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import argon2 from 'argon2';
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
	@Mutation(() => User)
	async register(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() { em }: EntityManagerType
	) {
		const { password, username } = options;
		const hashedPassword = await argon2.hash(password); // Argon2 hashed password

		const user = em.create(User, { username, password: hashedPassword });
		await em.persistAndFlush(user);
		return user;
	}
}
