import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export type EntityManagerType = {
	em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
