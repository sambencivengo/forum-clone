import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
	[OptionalProps]?: 'updatedAt' | 'createdAt';

	@Field(() => Int)
	@PrimaryKey()
	id!: number;

	@Field(() => Date)
	@Property({ type: Date, defaultRaw: 'clock_timestamp()' })
	createdAt = new Date();

	@Field(() => Date)
	@Property({
		type: Date,
		defaultRaw: 'clock_timestamp()',
		onUpdate: () => new Date(),
	})
	updatedAt = new Date();

	@Field()
	@Property({ type: 'text', unique: true })
	username!: string;

	@Property({ type: 'text' }) // No field property so that you cannot select it. Will be hashed
	password!: string;

	constructor(username: string, password: string) {
		this.username = username;
		this.password = password;
	}
}
