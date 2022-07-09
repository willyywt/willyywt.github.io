# Willy (Yang Wentao)
Willyywt's personal blog. See https://willyangywt.cc

## Minisign key
Public key: RWSVADkxkRruodtZOCHC0ym+ANlFDgx9UdCnseqWXzO0SvZgF+IP6kl+

Also see [minisign-1.pub](minisign-1.pub) (the same key as above)

## Download this site locally
Note: Artifacts are preserved for only latest 24 hours!

From "[Actions](https://github.com/willyywt/willyywt.github.io/actions/)", click the first line of "pages build and deployment" (the latest git commit), from the "Artifacts" section, click "github-pages" which gives you an .tar.zip file.

## Serve this site
Recently this site removed absolute reference to the domain name [willyangywt.cc](https://willyangywt.cc) (this site's domain), so this site can be served in another location like `http://127.0.0.1:8000`.

**Warning**: This site **must be served at the top most folder**, i.e. if you extracted this file to the directory "~/Download/github-pages/artifact/" then you must start a http server like `python3 -m http.server --bind :: --directory ~/Download/github-pages/artifact/ 8000`.

## Build the site locally
Install the [dependency](https://pages.github.com/versions/) and run `jekyll build`.

Disclaimer: I am a freshman in ruby entirely and I have no idea how things break.

## LICENSE
See the file LICENSE
