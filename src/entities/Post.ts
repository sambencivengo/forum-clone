import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Post {
	[OptionalProps]?: 'updatedAt' | 'createdAt';

	@Field(() => Int) // Exposes to the GraphQL Schema
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
	@Property({ type: 'text' })
	title!: string;

	constructor(title: string) {
		this.title = title;
	}
}
