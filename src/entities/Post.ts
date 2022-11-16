import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Post {
	@Field(() => Int) // Exposes to the GraphQL Schema
	@PrimaryKey()
	id!: number;

	@Field(() => Date)
	@Property({ type: Date })
	createdAt = new Date();

	@Field(() => Date)
	@Property({ type: Date, onUpdate: () => new Date() })
	updatedAt = new Date();

	@Field()
	@Property({ type: 'text' })
	title!: string;
}
