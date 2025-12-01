import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect/expect';
import { App } from 'fresh';

import layout from '../routes/_app.tsx';

describe('App Wrapper', () => {
	const handler = new App()
		.appWrapper(layout)
		.get('/', (ctx) => ctx.render(<h1>Home Page</h1>))
		.handler();

	it('wraps the application correctly', async () => {
		const req = new Request('http://localhost/');
		const res = await handler(req);
		const text = await res.text();

		expect(text).toContain('<nav'); // Check for Navigation component
		expect(text).toContain('<footer'); // Check for Footer component
		expect(text).toContain('Home Page'); // Check for main content
	});
});
