# Willy (Yang Wentao)
Willyywt's personal blog. See https://willyangywt.cc

## Minisign key
Public key: RWSVADkxkRruodtZOCHC0ym+ANlFDgx9UdCnseqWXzO0SvZgF+IP6kl+

Also see [minisign-1.pub](minisign-1.pub) (the same key as above)

## Features
* A custom template forked from [huangyz0918/moving](https://github.com/huangyz0918/moving), heavily modified and enhanced
* Improved support for valid HTML 5 and several W3C standards, like [minimum contrast ratio](https://www.w3.org/TR/WCAG21/#contrast-minimum)
* Site viewable without JavaScript
* Using [modernizer.js](https://github.com/Modernizr/Modernizr) to do feature detection. **Warning: modernizr.com website is outdated, see github repo directly**
* Code highlight statically rendered with [rouge](https://kramdown.gettalong.org/syntax_highlighter/rouge.html)
* Code highlight use a custom CSS theme, inspired by the pygments vim theme
* Excerpt (first paragraph) shown for each post on home page
* Dark theme support
* Mobile devices support
* A custom "Site Preferences" page
* Font: Open Sans (sans-serif), Source Code Pro (monospace); can also replace with system font in "Site Preferences".
* A "Table of Contents" powered by [jekyll-toc](https://github.com/allejo/jekyll-toc/), written in pure [liquid](https://jekyllrb.com/docs/liquid/) syntax (no additional jekyll plugins required)
* Plugins included: [jekyll-feed](https://github.com/jekyll/jekyll-feed/), [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag), [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap)
* Website can also be hosted at a URL subdirectory, i.e. at a sub folder of a domain
* Link to source code file at page footer

## Download this site locally
Note: Artifacts are preserved for only latest 24 hours!

From "[Actions](https://github.com/willyywt/willyywt.github.io/actions/)", click the first line of "pages build and deployment" (the latest git commit), from the "Artifacts" section, click "github-pages" which gives you an .tar.zip file.

## Serve this site
Recently this site removed absolute reference to the domain name [willyangywt.cc](https://willyangywt.cc) (this site's domain) and to the root directory '/' (all in-site links are relative), so this site can be served in another location like `http://127.0.0.1:8000/site/`.

## Build the site locally
Install the [dependency](https://pages.github.com/versions/) and run `jekyll build`.

Disclaimer: I am a freshman in ruby entirely and I have no idea how things break.

## LICENSE
See the file LICENSE
