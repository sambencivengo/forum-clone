import session from 'express-session';

export = session;

// NOTE: broken types from express-session are fixed with this module
declare module 'express-session' {
	interface SessionData {
		userId: number;
	}
}
