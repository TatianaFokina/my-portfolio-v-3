const pluginSass = require("eleventy-plugin-sass");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/fonts');
	eleventyConfig.addPassthroughCopy('src/scripts');
	//eleventyConfig.addPassthroughCopy({ "**/*.jpg": "img" });

	// Styles
	eleventyConfig.addPlugin(pluginSass, {
		watch: [
			'src/styles/**/*.{scss,sass}',
			'!node_modules/**'
		],
		outputDir: 'test/styles',
		cleanCSS: false
	});

	return {
		dir: {
			input: 'src',
			output: 'test',
			includes: '_partials',
			layouts: 'templates',
			data: 'data',
		},
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: false,
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true,
		templateFormats: [
			"md",
			"njk",
		],
	};
};
