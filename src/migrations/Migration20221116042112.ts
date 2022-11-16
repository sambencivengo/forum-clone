import { Migration } from '@mikro-orm/migrations';

export class Migration20221116042112 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null default clock_timestamp(), "updated_at" timestamptz(0) not null default clock_timestamp(), "title" text not null);'
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists "post" cascade;');
	}
}
