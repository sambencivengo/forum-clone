import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export type EntityManagerTYPE = {
	em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
