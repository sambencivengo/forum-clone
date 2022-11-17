import { User } from '../entities';
import { ApolloContext } from 'src/types';
import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from 'type-graphql';
import argon2 from 'argon2';
// Alternative way to use @Arg decorators for arguments
@InputType() // Used for arguments
class UsernamePasswordInput {
	@Field()
	username: string;
	@Field()
	password: string;
}

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType() // Used for responses
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req, em }: ApolloContext) {
		if (!req.session.userId) return null; // not logged in

		const user = await em.findOne(User, { id: req.session.userId });
		return user;
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() { em, req }: ApolloContext
	): Promise<UserResponse> {
		const { password, username } = options;

		if (username.length <= 4) {
			return {
				errors: [
					{
						field: 'username',
						message: 'username length must be greater than 4',
					},
				],
			};
		}
		if (password.length <= 4) {
			return {
				errors: [
					{
						field: 'password',
						message: 'password length must be greater than 4',
					},
				],
			};
		}

		const hashedPassword = await argon2.hash(password); // Argon2 hashed password

		const user = em.create(User, {
			username: username.toLowerCase(),
			password: hashedPassword,
		});
		try {
			await em.persistAndFlush(user);
		} catch (error) {
			if (error.code === '23505') {
				return {
					errors: [
						{
							field: 'username',
							message: 'username has already been taken',
						},
					],
				};
			}
			console.log('message: ', error.message);
		}

		req.session.userId = user.id;
		return { user };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() { em, req }: ApolloContext
	): Promise<UserResponse> {
		const { password: givenPassword, username } = options;
		const existingUser = await em.findOne(User, {
			username: username.toLowerCase(),
		});

		if (!existingUser) {
			return {
				errors: [
					{
						field: 'username',
						message: "That username doesn't exist",
					},
				],
			};
		}

		const valid = await argon2.verify(existingUser.password, givenPassword); // compare hashed password against plain text password
		if (!valid) {
			return {
				errors: [
					{
						field: 'password',
						message: 'incorrect password',
					},
				],
			};
		}

		req.session.userId = existingUser.id;

		return { user: existingUser };
	}
}
