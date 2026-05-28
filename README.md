# 11ty Masterclass

## eleventy-img

shortcode in eleventy.config.js file

```
{% optimizedImage "assets/images/hero.jpg", "A stunning hero image" %}
```

**How it works:** When 11ty compiles your templates, the async shortcode intercepts the path, runs the image through the sharp image processor, saves optimized variations to `dist/img/`, and outputs a perfectly formed, responsive `<picture>` tag with layout shifts eliminated.

## Liquid (Templating)

## Tailwind (CSS)

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
