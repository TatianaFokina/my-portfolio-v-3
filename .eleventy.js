const pluginSass = require("eleventy-plugin-sass");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/manifest.json');
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy({ "src/assets/*.{svg,jpg,png}": "assets" });
	eleventyConfig.addPassthroughCopy({ "src/assets/favicons/*.{svg,jpg,png}": "assets/favicons" });
	eleventyConfig.addPassthroughCopy({ "src/pages/images/**/*.svg": "images" });
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

	// Styles
	eleventyConfig.addPlugin(pluginSass, {
		watch: [
			"src/styles/**/*.{scss,sass}",
			"!node_modules/**"
		],
		outputDir: "test/styles",
		cleanCSS: false
	});

	// Shortcodes
	// Projects
	eleventyConfig.addPairedShortcode("projectColumn", function(content) {
		return `
			<div class="project-desc__column">
				${content}
			</div>
			`;
	});
	eleventyConfig.addPairedShortcode("projectDesc", function(content, title) {
		return `
			<div>
				<h2 class="project-desc__heading">${title}</h2>
				${content}
			</div>
			`;
	});

	// <picture>
	async function imageShortcode(src, className, alt, width) {
		if(alt === undefined) {
			throw new Error(`Missing \`alt\` on responsive image from: ${src}`);
		}

		let widths = [];
			widths.push(width, width*2);

		let metadataOriginal = await Image(src, {
			widths: widths,
			formats: [null],
			urlPath: "/images/",
			outputDir: "./test/images/"
		});

		let metadataWebp = await Image(src, {
			widths: widths,
			formats: ["webp"],
			urlPath: "/images/",
			outputDir: "./test/images/",
			sharpWebpOptions: {
				quality: 85,
				smartSubsample: true
			}
		});

		return `
			<picture>
				${Object.values(metadataWebp).map(imageFormat => {
					return `
						<source 
							type="${imageFormat[0].sourceType}"
							srcset="${imageFormat[0].url}, ${imageFormat[1].url} 2x">
					`;
				})}
				<img
					${Object.values(metadataOriginal).map(item => {
						return `
							src="${item[0].url}"					
							srcset="${item[0].url}, ${item[1].url} 2x"
							width="${item[0].width}"
							height="${item[0].height}"
						`;
					})}
					class="${className}"
					alt="${alt}"					
					decoding="async"
					loading="lazy">
	        </picture>
		`;
	}

	return {
		dir: {
			input: "src",
			output: "test",
			includes: "_partials",
			layouts: "templates",
			data: "data",
		},
		dataTemplateEngine: "njk",
		markdownTemplateEngine: false,
		htmlTemplateEngine: "njk",
		passthroughFileCopy: true,
		templateFormats: [
			"md",
			"njk",
		],
	};
};
