# 11ty Prototype

This prototype explores how to use 11ty. It uses [Liquid](https://liquidjs.com/) for templating and [Tailwind](https://tailwindcss.com/) for css.

- Liquid template component files belong in `src/_layouts`
- CSS files belong in `src/assets/css`
- JS files belong in `src/assets/js`

A lot of architecture and examples are a callback to my love of [Ember.js](https://emberjs.com/)

## The config

The config can be found in the eleventy.config.js file

## Scripts

The scripts can mainly be separated into build and run. The build scripts use 11ty and tailwind to generate the proper html and css files. The run scripts do the same but they also use 11ty to setup a simple http server on port 8080 for dev mode.

The `eleventy.config.js` file contains config that pulls the `src/assets/js` and `src/assets/fonts` directories directly into the output directory; which is configured to be `dist` in this case.

## Eleventy-img

> The Eleventy Image plugin is a build-time utility designed to automatically optimize, resize, and convert images for your website.

shortcode in `eleventy.config.js` file

```
{% optimizedImage "assets/images/hero.jpg", "A stunning hero image" %}
```

**How it works:** When 11ty compiles your templates, the async shortcode intercepts the path, runs the image through the sharp image processor, saves optimized variations to `dist/img/`, and outputs a perfectly formed, responsive `<picture>` tag with layout shifts eliminated.

## 11ty & Liquid Cheatsheet

### CLI Commands

|**Command**|**Purpose**|
|---|---|
|`npx @11ty/eleventy`|Single build outputting to production folder|
|`npx @11ty/eleventy --serve`|Starts local hot-reloading development server|
|`npx @11ty/eleventy --watch`|Watches for file changes and rebuilds without serving|
|`npx @11ty/eleventy --formats=md,html`|Limits compilation to specified extensions|

### Liquid Template Syntax vs Ember Handlebars

|**Feature**|**Ember Handlebars**|**11ty Liquid**|
|---|---|---|
|**Outputting Data**|`{{this.model.name}}`|`{{ name }}`|
|**Fallback Values**|`{{if this.name this.name "Default"}}`|`{{ name \| default: "Default" }}`|
|**Looping**|`{{#each this.items as|item|
|**Conditionals**|`{{#if this.isAdmin}}`|`{% if isAdmin %}` ... `{% endif %}`|
|**Helpers / Filters**|`{{format-date this.date}}`|`{{ date \| date: "%Y-%m-%d" }}`|
|**Partials / Components**|`{{my-component data=this.x}}`|`{% include "partial-name.liq", data: x %}`|

### Configuration Design Patterns Reference

#### Standard Directory Setup

JavaScript

```
// eleventy.config.js
module.exports = function(eleventyConfigure) {
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes", // Relative to input
      layouts: "_layouts",   // Relative to input
      data: "_data"          // Relative to input
    }
  };
};
```

#### Creating Custom Liquid Filters

Think of these as Ember Helpers used to transform text or data strings formatting.

JavaScript

```
// Inside eleventy.config.js
eleventyConfigure.addFilter("uppercase", function(value) {
  if (!value) return "";
  return value.toUpperCase();
});

// Usage in Liquid:
// {{ "hello" | uppercase }} -> HELLO
```

#### Creating a Collection

Collections allow you to group content programmatically (e.g., blog posts, documentation pages).

JavaScript

```
// Inside eleventy.config.js
eleventyConfigure.addCollection("posts", function(collectionApi) {
  // Grab all markdown files within the posts directory
  return collectionApi.getFilteredByGlob("src/posts/*.md");
});

// Usage in Liquid:
// {% for post in collections.posts %} ... {% endfor %}
```
