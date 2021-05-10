const pluginSass = require("eleventy-plugin-sass");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/fonts');
	eleventyConfig.addPassthroughCopy('src/scripts');
	eleventyConfig.addPassthroughCopy({ "src/**/*.{svg,jpg,png}": "images" });

	// Styles
	eleventyConfig.addPlugin(pluginSass, {
		watch: [
			'src/styles/**/*.{scss,sass}',
			'!node_modules/**'
		],
		outputDir: 'test/styles',
		cleanCSS: false
	});

	// Shortcode
	eleventyConfig.addPairedShortcode("project", function(titleFirst, titleSecond) {
		return `
			<div>
				<div>
					<div>
						<h2 class="project-desc__heading">${titleFirst}</h2>
					</div>
					<div>
						<h2 class="project-desc__heading">${titleSecond}</h2>
					</div>
				</div>
			</div>
			`;
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
