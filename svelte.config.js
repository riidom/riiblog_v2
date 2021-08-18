
import adapter from "@sveltejs/adapter-static"

import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */

const config = {
    "extensions": [".svelte", ...mdsvexConfig.extensions],

    kit: {
        adapter: adapter({ pages: 'test' }),
        paths: { base: '/test' },
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},

    preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
