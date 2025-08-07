// vite-plugin-robots.ts
import type { Plugin } from 'vite';

interface RobotsTxtOptions {
	siteURL?: string;
	devURL?: string;
}

export function robotsTxtPlugin(options: RobotsTxtOptions = {}): Plugin {
	const getRobotsTxt = (sitemapURL: string): string => `User-agent: *
Allow: /

Sitemap: ${sitemapURL}
`;

	return {
		name: 'robots-txt',
		configureServer(server) {
			// Handle robots.txt during development
			server.middlewares.use('/robots.txt', (_req, res) => {
				const siteURL =
					options.siteURL || options.devURL || 'http://localhost:5173';
				const sitemapURL = new URL('sitemap-index.xml', siteURL).href;

				res.setHeader('Content-Type', 'text/plain');
				res.end(getRobotsTxt(sitemapURL));
			});
		},
		generateBundle() {
			// Generate robots.txt for production build
			const siteURL =
				options.siteURL || process.env.VITE_SITE_URL || process.env.SITE_URL;

			if (!siteURL) {
				console.warn(
					'⚠️  No site URL provided for robots.txt. Skipping generation.',
				);
				return;
			}

			const sitemapURL = new URL('sitemap-index.xml', siteURL).href;

			this.emitFile({
				type: 'asset',
				fileName: 'robots.txt',
				source: getRobotsTxt(sitemapURL),
			});

			console.log('✅ robots.txt generated with sitemap:', sitemapURL);
		},
	};
}
