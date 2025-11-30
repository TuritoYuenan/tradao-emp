import { App, cors, staticFiles, trailingSlashes } from 'fresh';
import { type State } from '$lib/utils.ts';

export const app = new App<State>()
	.use(cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization'],
	}))
	.use(trailingSlashes('never'))
	.use(staticFiles())
	.fsRoutes();
