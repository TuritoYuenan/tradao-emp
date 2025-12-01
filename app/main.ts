import { App, cors, staticFiles, trailingSlashes } from 'fresh';

export const app = new App()
	.use(cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization'],
	}))
	.use(trailingSlashes('never'))
	.use(staticFiles())
	.fsRoutes();
