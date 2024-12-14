/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'Redaction': ['Redaction', 'sans-serif'],
			'RedactionBold': ['Redaction Bold', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
}
