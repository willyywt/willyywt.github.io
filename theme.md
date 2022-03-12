---
layout: post
title: "My blog theme: jekyll 'moving' theme with more features"
last_modified_at: 2022-03-12
---
My blog's repo: [github.com/willyywt/willyywt.github.io](https://github.com/willyywt/willyywt.github.io/) is forked from the jekkyll theme from [github.com/huangyz0918/moving](https://github.com/huangyz0918/moving/). As the time goes I tweak the theme to my liking and add a lot of features to it.

## Simplify usage - fork your own
I originally used `remote_theme` but using `remote_theme` is not convenient when you need to override the original files: you cannot use git to view differences because `remote_theme` is not merged to your own repository.

Github pages can use custom theme in your repository, instead of using a `remote_theme`.  To use a github theme, you can fork the theme to your repository and directly change files in your own repository. If you want to update patches from the original theme simply do a git merge.

### Heavily changed index page
I changed the template for index page (home page) to my liking. The home page now includes a category summary, use black links instead of bluish ones, and shows an excerpt for each article.

### Numerous tweak on css
I also changed css to my liking, like changed base font size to 16 instead of 18, use standard #0000ee for link color, etc.

## Jekyll post
I took advantage of many builtin jekyll features (which wasn't in the original "moving" theme). Jekyll's documentation on jekyll post is at [Posts | Jekyll](https://jekyllrb.com/docs/posts/).

### Category
I added categories for each blog post. Category is a jekyll's builtin feature, but jekyll doesn't define how to display pages of such category: what jekyll do is to find pages under a specific category. So I define how to display pages of a category as in the following:

* On the index page we iterate all pages under this site, finds the pages under `layout: category`, and show links to these list pages, which are category list pages.
* The template layout of category list pages is defined as in `_layouts/category.html`, so that category list page can list all posts in a specific category. 
* Each category's list page is manually written in file `category/<name>.md` where `<name>` is the category name, like this: (assuming "name" is "admin" and the file is `category/admin.md`)
```
---
layout: category
title: "Category: admin"
category: admin
---
```

### Excerpt
Excerpt is also a jekyll's builtin feature. By default this will be the first paragraph (first `<p>` element) of your post. You can also explicitly designate a post's excerpt using the jekyll `excerpt` variable.

## Dark mode
I merged a dark mode designed by Vel-San (but changed accent color). Repo: [github.com/Vel-San/moving darkmode](https://github.com/Vel-San/moving/tree/dark-mode), Vel-San's pull request to huangyz0918(unmerged): [UI Full Dark mode](https://github.com/huangyz0918/moving/pull/36)

### Media query
Media query is one line away: `@media (prefers-color-scheme: light)`. Sass doesn't implement (re)defining sass variables under media query: you might expect sass to compile it to media queries but sass will simply error out.

I turned to a more monolithic approach: load different css stylesheet files depend on media query results. I planned to use `@media (prefers-color-scheme: light)` and `@media (prefers-color-scheme: dark)` for this purpose (it can be added to `<link>` element `media` attribute), but this is not friendly to old browsers which do not support `prefers-color-scheme` at all (those browsers will not use any of these stylesheets), so I changed my plan: now I use javascript to load `<link>` element so that browsers which does not return true for `window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches` can fallback to the light css stylesheet.

## Move bitter font to local
The moving theme uses bitter from google fonts, but I think hosting it locally is better, so I have changed the theme to use local bitter font.

Article: [How & Why I Host Google Fonts Locally (January 2022)](https://www.wpmediamastery.com/host-google-fonts-locally/)

Download font locally: [Google Webfonts helper](https://google-webfonts-helper.herokuapp.com/fonts)

## Code highlight
I use kramdown's builtin [rouge](https://kramdown.gettalong.org/syntax_highlighter/rouge.html) instead of [highlight.js](https://highlightjs.org/). A matching highlight css theme is in `/_sass/rouge.scss` and `/_sass/rouge-dark.scss`. (Rouge transform code to html elements, but don't do css stylesheet itself; you have to choose a css theme for rouge.)
