/* @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat License */
/*!
  * Simple-Jekyll-Search
  * Copyright 2015-2020, Christian Fei
  * Licensed under the MIT License.
  */
!function(){"use strict";var f={compile:function(r){return i.template.replace(i.pattern,function(t,e){var n=i.middleware(e,r[e],i.template);return void 0!==n?n:r[e]||t})},setOptions:function(t){i.pattern=t.pattern||i.pattern,i.template=t.template||i.template,"function"==typeof t.middleware&&(i.middleware=t.middleware)}};var i={pattern:/\{(.*?)\}/g,template:"",middleware:function(){}};var n=function(t,e){var n=e.length,r=t.length;if(n<r)return!1;if(r===n)return t===e;t:for(var i=0,o=0;i<r;i++){for(var u=t.charCodeAt(i);o<n;)if(e.charCodeAt(o++)===u)continue t;return!1}return!0},e=new function(){this.matches=function(t,e){return n(e.toLowerCase(),t.toLowerCase())}},r=new function(){this.matches=function(e,t){return!!e&&(e=e.trim().toLowerCase(),(t=t.trim().toLowerCase()).split(" ").filter(function(t){return 0<=e.indexOf(t)}).length===t.split(" ").length)}},d={put:function(t){if(l(t))return a(t);if(function(t){return Boolean(t)&&"[object Array]"===Object.prototype.toString.call(t)}(t))return function(n){var r=[];s();for(var t=0,e=n.length;t<e;t++)l(n[t])&&r.push(a(n[t]));return r}(t);return undefined},clear:s,search:function(t){return t?function(e,n,r,i){var o=[];for(var t=0;t<e.length&&o.length<i.limit;t++){var u=function(t,e,n,r){for(var i in t)if(!function(n,r){for(var t=0,e=r.length;t<e;t++){var i=r[t];if(new RegExp(i).test(n))return!0}return!1}(t[i],r.exclude)&&n.matches(t[i],e))return t}(e[t],n,r,i);u&&o.push(u)}return o}(u,t,c.searchStrategy,c).sort(c.sort):[]},setOptions:function(t){c=t||{},c.fuzzy=t.fuzzy||!1,c.limit=t.limit||10,c.searchStrategy=t.fuzzy?e:r,c.sort=t.sort||o,c.exclude=t.exclude||[]}};function o(){return 0}var u=[];var c={};function s(){return u.length=0,u}function l(t){return Boolean(t)&&"[object Object]"===Object.prototype.toString.call(t)}function a(t){return u.push(t),u}c.fuzzy=!1,c.limit=10,c.searchStrategy=c.fuzzy?e:r,c.sort=o,c.exclude=[];var p={load:function(t,e){var n=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");n.open("GET",t,!0),n.onreadystatechange=h(n,e),n.send()}};function h(e,n){return function(){if(4===e.readyState&&200===e.status)try{n(null,JSON.parse(e.responseText))}catch(t){n(t,null)}}}var m=function y(t){if(!(e=t)||!("undefined"!=typeof e.required&&e.required instanceof Array))throw new Error("-- OptionsValidator: required options missing");var e;if(!(this instanceof y))return new y(t);var r=t.required;this.getRequiredOptions=function(){return r},this.validate=function(e){var n=[];return r.forEach(function(t){"undefined"==typeof e[t]&&n.push(t)}),n}},w={merge:function(t,e){var n={};for(var r in t)n[r]=t[r],"undefined"!=typeof e[r]&&(n[r]=e[r]);return n},isJSON:function(t){try{return t instanceof Object&&JSON.parse(JSON.stringify(t))?!0:!1}catch(e){return!1}}};!function(t){var i={searchInput:null,resultsContainer:null,json:[],success:Function.prototype,searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',templateMiddleware:Function.prototype,sortMiddleware:function(){return 0},noResultsText:"No results found",limit:10,fuzzy:!1,debounceTime:null,exclude:[]},n;var e=function(t,e){e?(clearTimeout(n),n=setTimeout(t,e)):t.call()};var r=["searchInput","resultsContainer","json"];var o=m({required:r});function u(t){d.put(t),i.searchInput.addEventListener("input",function(t){-1===[13,16,20,37,38,39,40,91].indexOf(t.which)&&(c(),e(function(){l(t.target.value)},i.debounceTime))})}function c(){i.resultsContainer.innerHTML=""}function s(t){i.resultsContainer.innerHTML+=t}function l(t){var e;(e=t)&&0<e.length&&(c(),function(e,n){var r=e.length;if(0===r)return s(i.noResultsText);for(var t=0;t<r;t++)e[t].query=n,s(f.compile(e[t]))}(d.search(t),t))}function a(t){throw new Error("SimpleJekyllSearch --- "+t)}t.SimpleJekyllSearch=function(t){var n;0<o.validate(t).length&&a("You must specify the following required options: "+r),i=w.merge(i,t),f.setOptions({template:i.searchResultTemplate,middleware:i.templateMiddleware}),d.setOptions({fuzzy:i.fuzzy,limit:i.limit,sort:i.sortMiddleware,exclude:i.exclude}),w.isJSON(i.json)?u(i.json):(n=i.json,p.load(n,function(t,e){t&&a("failed to get JSON ("+n+")"),u(e)}));t={search:l};return"function"==typeof i.success&&i.success.call(t),t}}(window)}();

var s1 = document.getElementById("search1")
var ss = document.getElementById('search-wrapper')
var res1 = document.getElementById("search1-result")
if (window.matchMedia && window.matchMedia('(max-width: 849px)').matches) { /* __hardcode__ header bar z-index stack max-width */
  s1.addEventListener('focus', function(){ss.style.zIndex = 2; ss.style.position = 'absolute'; ss.style.width = 'calc(100% - 2rem)'; ss.style.left = '1rem'; ss.style.boxSizing = 'border-box'})
  s1.addEventListener('blur', function(){if(s1.value) return; ss.style.zIndex = ''; ss.style.position = ''; ss.style.width = ''; ss.style.left = ''; ss.style.boxSizing = ''})
}
s1.addEventListener('focus', function(){res1.style.display = ''})
s1.addEventListener('blur', function(){if(s1.value) return; res1.style.display = 'none';})

var stj_str = ROOTDIR + "search_text.json"
var search_json_or_url = stj_str
if (Modernizr.promises && Modernizr.cache_1 && Modernizr.arrow && Modernizr.json && Modernizr.localstorage) {
  caches.open('v1').then(function (cache) {
    if (localStorage.getItem("TEXTVER") === DATE) {
      cache.match(stj_str).then(function (res) {
        if (!res || !res.ok) {
          /* This means the cache is corrupted, i.e. user abruptly close browser. */
          localStorage.removeItem("TEXTVER")
          return load_and_sjs(cache)
        } else {
          return res.text().then(function (str) {
            search_json_or_url = JSON.parse(str)
            sjs()
          }).catch(function (e) {
            return Promise.reject(e)
          })
        }
      }).catch(function (e) {
        return Promise.reject(e)
      })
    } else {
      return load_and_sjs(cache)
    }
  }).catch(function (e) {
    throw e
  })
} else {
  sjs()
}
function load_and_sjs(cache) {
  return fetch(stj_str).then(function (response) {
    if (!response.ok) {
      return Promise.reject("Bad response")
    }
    var res_backup = response.clone()
    /* Make sure TEXTVER only updated after writing to cache. */
    cache.put(stj_str, response).then(function() {
      localStorage.setItem("TEXTVER", DATE)
    })
    res_backup.text().then(function (str) {
      search_json_or_url = JSON.parse(str)
      sjs()
    }).catch(function (e) {
      return Promise.reject(e)
    })
  }).catch(function (e) {
    return Promise.reject(e)
  })
}
function sjs() {
window.sjs = SimpleJekyllSearch({
  searchInput: document.getElementById("search1"),
  resultsContainer: document.getElementById("search1-result"),
  json: search_json_or_url,
  limit: 999,
  searchResultTemplate: '<li><a class="search-url" href="' + ROOTDIR.substring(0,ROOTDIR.length-1) + '{url}"><b>{title}</b><br/><small>{url}</small></a></li>'
})
s1.setAttribute("placeholder", "Search...")
}
/* @license-end */
