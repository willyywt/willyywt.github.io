---
layout: post
title: "Resource inlining for github pages"
last_modified_at: 2022-07-09
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
**Warning: Resource inlining is removed in favor of Cache API, since CSS gets a lot bigger than I wish and cannot fit in 17kb download size.**

Github pages comes with 10 minute cache time, which makes the [Render Blocking](https://web.dev/render-blocking-resources/) resources takes *two* RTT to load almost everytime. Resource inlining shortens the [Critical Rendering Path](https://web.dev/critical-rendering-path-page-speed-rules-and-recommendations/): only *one* RTT is spent to load a web page. Reducing RTTs helps shortening network delays: one RTT can takes more than 150ms (or even larger on unstable networks). 

## TL;DR
The major motivation is to **reduce network delay**, measured in terms of RTT (Round Trip Time) to the server.

## What is resource inlining
CSS and JavaScript resource inlining is including the style and script text content directly inside `<style>` and `<script>` element of HTML, instead of using a `href` and a `src` attribute to give a link to the original `.css` and `.js` files. In this way, css and js are downloaded as part of the HTML (for valid HTML 5 `<style>` should entirely be in `<head>`; `<script>` has no such requirement, although it can also entirely in `<head>`).

Before inlining
```html
<!doctype html>
<html lang="en">
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  ...
</html>
```
```css
/* https://fonts.googleapis.com/icon?family=Material+Icons */
/* fallback */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/font.woff2) format('woff2');
}

.material-icons {
  /*...*/
}
```

After inlining
```html
<!doctype html>
<html lang="en">
<head>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin >
  <style type="text/css">
  @font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/font.woff2) format('woff2');}.material-icons{/*...*/}</style>
  ...
</html>
```

## Motivation for resource inlining
### Resource inlining reduce one RTT
The major motivation is to **reduce network delay**, measured in terms of RTT (Round Trip Time) to the server. With resource inlining only *one* RTT is spent to download resources for rendering the web page (this doesn't count the RTTs spent on establishing a TCP and a TLS connection; with TLS 1.3 it typically spend one RTT for TCP and another RTT for TLS).

The common practice of using `<link href="/main.css">` to load CSS in `/main.css` and using `<script src="/main.js">` to load JavaScript in `/main.js`. Under such practice, after downloading the initial HTML, the browser must in addition to download these css and js files before rendering the HTML page -- most css and js resources are [Render Blocking](https://web.dev/render-blocking-resources/). (unless these files failed to download due to network errors, in which the browser will render raw HTML directly)

If the resources are not cached (e.g. on first visit to this website), the browser will have to spent another RTT to download the resources, so it takes *two* RTT to render a web page on first visit to this site; if the resources are cached, the browsers can use cached resources to render web page, and doesn't need to wait for an additional RTT.

If the css and js resource is inlined in HTML (instead of given a link to download with), then all requests will only take one RTT, since the css and js is downloaded together with the HTML.

The `<link>` and `<script>` approach is pretty ideal enough for most sites with long caching time: almost all visits are one RTT, except the initial visit and the visits that expired the cache (for example cdnjs have cache age for 355 days: `cache-control: public, max-age=30672000`).

### Github pages set max-age=600
However, github pages forces a 10-minute cache time: github pages return HTTP header `cache-control: max-age=600` making cache only last 600 seconds = 10 minutes, which is very undesirable.

A mere cache age of 10 minutes means almost all visits are two RTT. Before I use some magic script to [circumvent Github pages cache limit](#circumvent-github-pages-cache-limit), I must made these css and js resources inline so that requests takes one RTT instead of two RTT. 

### Circumvent Github pages cache limit
This is somewhat complicated to do but is doable. Modern browsers provide a [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) which ignores HTTP caching headers. For browsers that doesn't have this I can fall back to `localStorage` instead. (Feature availability can be checked by [modernizr.js](https://modernizr.com/), which is more robust and doesn't discriminate users by their 'User Agent' String.)

### Doesn't inlining consume more network data?
It does (HTML becomes bigger after inlining css and js), but I consider network delay to be **MUCH** more important than total sum of network data. HTML pages are already in the order of few kilobytes, and trading a few kilobytes for one reduced RTT (which means about 150ms for a bad network connection; it can take even more on unstable network environments) is worthwile.

### Can't the server just push css and js alongside with the initial HTML?
I sincerely hope so, and there are many protocols are suggested to implement this. TLS 1.3 has a "server push" feature, and is supported on most browsers (see [Can I use "Server Push"?](https://caniuse.com/?search=server%20push)). The problem is that very few servers implement it, according to Chrome team's measurement. (My personal rant: because servers run 24-7, they care more about data consumption rather than internet delay.) Chrome team even suggested to [Remove HTTP/2 and gQUIC server push](https://groups.google.com/a/chromium.org/g/blink-dev/c/K3rYLvmQUBY):

> Almost five and a half years after the publication of the HTTP/2 RFC, server push is still extremely rarely used.  Over the past 28 days, 99.95% of HTTP/2 connections created by Chrome never received a pushed stream (Net.SpdyStreamsPushedPerSession), and 99.97% of connections never received a pushed stream that got matched with a request (Net.SpdyStreamsPushedAndClaimedPerSession).  These numbers are exactly the same as in June 2019.  In June 2018, 99.96% of HTTP/2 connections never received a pushed stream.  These numbers indicate the lack of active efforts by server operators to increase push usage.  **On top of this, less than 40% of received pushes are used, down from 63.51% two years ago.  The rest are invalid, never get matched to a request, or already in cache.**
> 
> Server push is very difficult to use well.  Akamai publicly shared two studies showing that push over HTTP/2 either does not change performance or improves performance marginally when used with certain restrictions, see https://lists.w3.org/Archives/Public/ietf-http-wg/2019JulSep/0078.html.  However, these studies had been done more than a year ago and push usage data still does not indicate wide deployment even within Akamai’s network.  In light of this it is doubtful that smaller server operators have the resources to successfully deploy server push.
> A contrasting result has been presented to the same IETF in 2018: a large experiment done by Chrome to measure the effect of server push on page load latency when using HTTP/2 showed that push increases latency at the long tail, see https://github.com/httpwg/wg-materials/blob/gh-pages/ietf102/chrome_push.pdf.
> As far as gQUIC goes, over the past 28 days, less than 1 out of 1,200,000 connections have seen any pushed streams.  We are not aware of any studies done on the effect of latency.

The previous draft for [Cache-Digest in HTTP/2](https://tools.ietf.org/html/draft-ietf-httpbis-cache-digest-05) is already abandoned, which signals that HTTP/2 Push will unlikely to revive (because without cache hints servers must repeatedly send repeated resource, thus increasing network data)

Google proposed a new experimental HTTP Status: **`103 Early Hints`**, which is firstly implemented in Chrome and Google Servers. Browsers other than chrome have not yet implemented support for this HTTP status.

### What do we have without http/2 server push?
Not too much. Chrome suggested a `<link rel=preload>`, but it can't be used to reduce RTT. (It is only a hint that browsers should start connecting in the middle way of parsing HTML, but HTML parsing itself is fast.). We are pretty much back to old days: either a bunch of small requests, or one big request (inline resources).

## TCP slow start
We assumed that a tcp slow-start congestion control algorithm is applied, which applies to most slow networks. (For high speed network inside data centers this might not be true). As of RFC 6928 in April 2013, the initial CWND (TCP Congestion window size) is 10 TCP segments. The slow-start algorithm will then increase one TCP segment for each ACK received. This means that the CWND will double for every RTT, unless a packet loss occurs, in which the CWND undergoes a propotional rate reduction (as of RFC 6937 in May 2013).

For long-running TCP connections (e.g. a connection to GCM (Google Cloud Messaging) waiting for an android push, or a large streaming download), the overhead introduced by TCP slow start is amortized over the entire lifetime of TCP connection, but for usual HTTP connections which are short and bursty, TCP slow start means that HTTP download speed are much lower than the peak download speed.

### First RTT data download size
For http without TLS, only 10 segments which is about 13.6kb can be downloaded during the first RTT! For https connections, since TLS handshake contributes to CWND increase (server already get TCP ACK during TLS handshake), this will mean 3 ACK's increased (TLS certificates + TLS headers is larger than 2 TCP segments), and we can expect a 17.7kb download during the first RTT.

### HTTP Compression
We can assume gzip compression for most cases (the brotili compression is not provided by Github Pages). For legacy clients that do not does gzip compression, the best we can do is to suggest them use a new browser.

## Some reference links
[Networking 101: Transport Layer Security (TLS)](https://hpbn.co/transport-layer-security-tls/)

[Resource inlining in JavaScript frameworks](https://web.dev/aurora-resource-inlining/)

[Performance testing HTTP/1.1 vs HTTP/2 vs HTTP/2 + Server Push for REST APIs](https://evertpot.com/h2-parallelism/)

[Chrome to remove HTTP/2 Push](https://www.ctrl.blog/entry/http2-push-chromium-deprecation.html)