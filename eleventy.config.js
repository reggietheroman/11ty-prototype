const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function(eleventyConfigure) {

  // Async Shortcode for Optimized Images
  eleventyConfigure.addAsyncShortcode("optimizedImage", async function(src, alt, widths = [300, 600, 900]) {
    let fullSrc = path.join(__dirname, "src", src);
    
    let metadata = await Image(fullSrc, {
      widths: widths,
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./dist/img/",
      urlPath: "/img/"
    });

    let imageAttributes = {
      alt,
      sizes: "(min-width: 30em) 50vw, 100vw",
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Pass through static assets directly to dist/
  eleventyConfigure.addPassthroughCopy("src/assets/js");
  eleventyConfigure.addPassthroughCopy("src/assets/fonts");
  
  // Return your configuration object
  return {
    dir: {
      input: "src",          // Source files
      output: "dist",        // Built static site
      includes: "_includes", // Partials and shortcodes (relative to input)
      layouts: "_layouts"    // Layout files (relative to input)
    },
    // markdownTemplateEngine: "liquid", // Use Liquid for markdown files, default is already liquid
    // htmlTemplateEngine: "liquid"      // Use Liquid for HTML files, default is already liquid
  };
};

