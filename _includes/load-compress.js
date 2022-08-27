(function(scriptGlobalObject,window,document,undefined){function is(a,b){return typeof a===b}function testRunner(){var a,b,c,d,e,f,g;for(var h in tests)if(tests.hasOwnProperty(h)){if(a=[],b=tests[h],b.name&&(a.push(b.name.toLowerCase()),b.options&&b.options.aliases&&b.options.aliases.length))for(c=0;c<b.options.aliases.length;c++)a.push(b.options.aliases[c].toLowerCase());for(d=is(b.fn,"function")?b.fn():b.fn,e=0;e<a.length;e++)f=a[e],g=f.split("."),1===g.length?Modernizr[g[0]]=d:((!Modernizr[g[0]]||Modernizr[g[0]]&&!(Modernizr[g[0]]instanceof Boolean))&&(Modernizr[g[0]]=new Boolean(Modernizr[g[0]])),Modernizr[g[0]][g[1]]=d),classes.push((d?"":"no-")+g.join("-"))}}function setClasses(a){var b=docElement.className,c=Modernizr._config.classPrefix||"";if(isSVG&&(b=b.baseVal),Modernizr._config.enableJSClass){var d=new RegExp("(^|\\s)"+c+"no-js(\\s|$)");b=b.replace(d,"$1"+c+"js$2")}Modernizr._config.enableClasses&&(0<a.length&&(b+=" "+c+a.join(" "+c)),isSVG?docElement.className.baseVal=b:docElement.className=b)}function addTest(a,b){if("object"==typeof a)for(var c in a)hasOwnProp(a,c)&&addTest(c,a[c]);else{a=a.toLowerCase();var d=a.split("."),e=Modernizr[d[0]];if(2===d.length&&(e=e[d[1]]),"undefined"!=typeof e)return Modernizr;b="function"==typeof b?b():b,1===d.length?Modernizr[d[0]]=b:(Modernizr[d[0]]&&!(Modernizr[d[0]]instanceof Boolean)&&(Modernizr[d[0]]=new Boolean(Modernizr[d[0]])),Modernizr[d[0]][d[1]]=b),setClasses([(b&&!1!==b?"":"no-")+d.join("-")]),Modernizr._trigger(a,b)}return Modernizr}function createElement(){return"function"==typeof document.createElement?isSVG?document.createElementNS.call(document,"http://www.w3.org/2000/svg",arguments[0]):document.createElement.apply(document,arguments):document.createElement(arguments[0])}function getBody(){var a=document.body;return a||(a=createElement(isSVG?"svg":"body"),a.fake=!0),a}function injectElementWithStyles(a,b,c,d){var e,f,g,h,j=createElement("div"),k=getBody();if(parseInt(c,10))for(;c--;)g=createElement("div"),g.id=d?d[c]:"modernizr"+(c+1),j.appendChild(g);return e=createElement("style"),e.type="text/css",e.id="smodernizr",(k.fake?k:j).appendChild(e),k.appendChild(j),e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),j.id="modernizr",k.fake&&(k.style.background="",k.style.overflow="hidden",h=docElement.style.overflow,docElement.style.overflow="hidden",docElement.appendChild(k)),f=b(j,a),k.fake&&k.parentNode?(k.parentNode.removeChild(k),docElement.style.overflow=h,docElement.offsetHeight):j.parentNode.removeChild(j),!!f}function computedStyle(a,b,c){var d;if("getComputedStyle"in window){d=getComputedStyle.call(window,a,b);var e=window.console;if(null!==d)c&&(d=d.getPropertyValue(c));else if(e){var f=e.error?"error":"log";e[f].call(e,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else d=!b&&a.currentStyle&&a.currentStyle[c];return d}var tests=[],ModernizrProto={_version:"3.12.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!1,usePrefixes:!0},_q:[],on:function(a,b){var c=this;setTimeout(function(){b(c[a])},0)},addTest:function(a,b,c){tests.push({name:a,fn:b,options:c})},addAsyncTest:function(a){tests.push({name:null,fn:a})}},Modernizr=function(){};Modernizr.prototype=ModernizrProto,Modernizr=new Modernizr;var classes=[];var docElement=document.documentElement,isSVG="svg"===docElement.nodeName.toLowerCase();var hasOwnProp;(function(){var a={}.hasOwnProperty;hasOwnProp=is(a,"undefined")||is(a.call,"undefined")?function(a,b){return b in a&&is(a.constructor.prototype[b],"undefined")}:function(b,c){return a.call(b,c)}})(),ModernizrProto._l={},ModernizrProto.on=function(a,b){this._l[a]||(this._l[a]=[]),this._l[a].push(b),Modernizr.hasOwnProperty(a)&&setTimeout(function(){Modernizr._trigger(a,Modernizr[a])},0)},ModernizrProto._trigger=function(a,b){if(this._l[a]){var c=this._l[a];setTimeout(function(){var a,d;for(a=0;a<c.length;a++)d=c[a],d(b)},0),delete this._l[a]}},Modernizr._q.push(function(){ModernizrProto.addTest=addTest});var mq=function(){var a=window.matchMedia||window.msMatchMedia;return a?function(b){var c=a(b);return c&&c.matches||!1}:function(a){var b=!1;return injectElementWithStyles("@media "+a+" { #modernizr { position: absolute; } }",function(a){b="absolute"===computedStyle(a,null,"position")}),b}}();ModernizrProto.mq=mq,Modernizr.addTest("mediaqueries",mq("only all")),Modernizr.addTest("classlist","classList"in docElement),Modernizr.addTest("arrow",function(){try{eval("()=>{}")}catch(a){return!1}return!0}),Modernizr.addTest("es6object",!!(Object.assign&&Object.is&&Object.setPrototypeOf)),Modernizr.addTest("promises",function(){return"Promise"in window&&"resolve"in window.Promise&&"reject"in window.Promise&&"all"in window.Promise&&"race"in window.Promise&&function(){var a;return new window.Promise(function(b){a=b}),"function"==typeof a}()}),Modernizr.addTest("json","JSON"in window&&"parse"in JSON&&"stringify"in JSON),Modernizr.addTest("localstorage",function(){try{return localStorage.setItem("modernizr","modernizr"),localStorage.removeItem("modernizr"),!0}catch(a){return!1}}),Modernizr.addTest("urlparser",function(){var a;try{return a=new URL("http://modernizr.com/"),"http://modernizr.com/"===a.href}catch(a){return!1}}),testRunner(),setClasses(classes),delete ModernizrProto.addTest,delete ModernizrProto.addAsyncTest;for(var i=0;i<Modernizr._q.length;i++)Modernizr._q[i]();scriptGlobalObject.Modernizr=Modernizr})(window,window,document),Modernizr.addTest("cssvar_1","CSS"in window&&"supports"in window.CSS&&window.CSS.supports("(--foo: red)")),Modernizr.addTest("mediaqueryevent_1",function(){var a=!1;try{a=MediaQueryList&&MediaQueryList.prototype instanceof EventTarget}catch(a){}return a}),Modernizr.addTest("es6_object_entries_1","entries"in Object),Modernizr.addTest("cache_1","Cache"in window&&"CacheStorage"in window&&"caches"in window);var gcs_deps={cssvar_1:"",mediaqueryevent_1:"",classlist:"",localstorage:"",urlparser:"",es6object:"",es6_object_entries_1:"",json:""},gcs_missing="";for(i in gcs_deps)Modernizr[i]||(gcs_missing&&(gcs_missing+=","),gcs_missing+=i);var nameDefaults={font:"pref-font-default",monofont:"pref-monofont-default",theme:"pref-theme-default",fontsize:"pref-fontsize-default","fontsize-selectelm":"default",monofontsize:"pref-monofontsize-default","monofontsize-selectelm":"default"},hookJson={ff:"",fs:""};function NoteEl(a,b){var c=document.createElement("div");return c.setAttribute("class","note "+a),c.textContent=b,c}function Hook(a,b){function c(){var a=hookJson.ff,b=hookJson.fs,c="";a&&(c+="pre,code{font-family:"+a+";}"),b&&(c+="pre,code{font-size:"+b+";}"),k.textContent=c}function d(a){var b={"pref-font-default":{fontFamily:""},"pref-font-brand":{fontFamily:"-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif"},"pref-font-system-ui":{fontFamily:"system-ui, sans"}};if("pref-font-default"==a)return j.style.lineHeight="",void(j.style.fontFamily="");if(a in b){var c=b[a].fontFamily;c&&(j.style.fontFamily=c)}else return}function e(a){var b={"pref-monofont-default":"","pref-monofont-brand":"SFMono-Regular,SF Mono,Menlo,Consolas,Monaco,Lucida Console,Liberation Mono,Cousine,monospace","pref-monofont-fallback":"ui-monospace,monospace"};if(a in b){var d=b[a];hookJson.ff=d}else return;c()}function f(a){return a&&"default"!==a?a.substring(0,4):""}function g(a){j.style.fontSize=a}function h(a){hookJson.fs=a,c()}var j=document.documentElement,k=document.getElementById("csshook"),l=a.substring(10),m={font:d,monofont:e,theme:function(a){if(Modernizr.classlist&&Modernizr.mediaqueries){var b=window.matchMedia("(prefers-color-scheme: dark)").matches;if("pref-theme-dark"===a)b=!0;else if("pref-theme-light"==a)b=!1;else if("pref-theme-default"!=a)return;b?(j.classList.add("dark"),j.style.colorScheme="dark"):(j.classList.remove("dark"),j.style.colorScheme="light")}},fontsize:function(a){var b="pref-fontsize-default"===a||!a?"":f(localStorage.getItem("name-pref-fontsize-selectelm"));g(b)},"fontsize-selectelm":function(a){if("pref-fontsize-custom"==localStorage.getItem("name-pref-fontsize")){var b=f(a);g(b)}},monofontsize:function(a){var b="pref-monofontsize-default"===a||!a?"":f(localStorage.getItem("name-pref-monofontsize-selectelm"));h(b)},"monofontsize-selectelm":function(a){if("pref-monofontsize-custom"==localStorage.getItem("name-pref-monofontsize")){var b=f(a);h(b)}}}[l];b&&m&&m(b)}function gcs_theme(){var a=!0,b=!0;if(Modernizr.localstorage){var c=localStorage.getItem("name-pref-theme");"pref-theme-light"==c?(a=!1,use_light=!0):"pref-theme-dark"==c&&(a=!1,b=!1)}return a?"preferred_color_scheme":b?"light":"dark"}(function(){function b(){m&&(m.textContent=o)}function c(a){o=o+a.type+":"+a.message+"\n",o=o+(a.target&&a.target.outerHTML?a.target.outerHTML:"")+"\n",b()}function d(a){var b=document.createElement("link");b.setAttribute("rel","stylesheet"),b.setAttribute("href",a),q.insertBefore(b,r)}function e(a){var b=document.createElement("style");b.textContent=a,q.insertBefore(b,r)}function f(){for(i in a)d(a[i])}function g(){caches.open("v1").then(function(b){var c=localStorage.getItem("CSSVER"),d=Promise.resolve(""),g=[];if(!c||c!==CSSVER){for(i in a)g.push(b.delete(a[i]));d=Promise.all(g).then(function(){localStorage.setItem("CSSVER",CSSVER)}),g=[]}for(i in a)g.push(b.match(a[i]));d=Promise.all(g).then(function(c){var d=!0;for(i in c){var g=c[i];if(!g||!g.ok){d=!1;break}}if(d){var h=[];for(i in c){var g=c[i];h.push(g.text())}Promise.all(h).then(function(a){for(i in c)e(a[i])})}else for(i in f(),a)b.add(a[i])}).catch(function(a){return Promise.reject(a)})}).catch(function(a){f(),c(a)})}function h(){function a(){return document.documentElement.classList.contains("dark")}p&&(m=document.getElementById("debug-log"),m.textContent=o);var b=document.querySelector(".search-wrapper");b&&(b.style.display="");var c=document.getElementById("overlay"),d=document.querySelector(".wrapper nav.nav-toc"),e=document.getElementById("list");e.addEventListener("click",function(){d.style.display="block",d.style.position="fixed",d.style.top=0,d.style.left=0,d.style.height="100vh",d.style.width="80vw",d.style.zIndex=3,d.style.backgroundColor=a()?"#111":"#fafafa",d.style.overflow="scroll",d.style.marginLeft=0,d.style.paddingLeft="1rem",c.style.visibility=""}),c.addEventListener("click",function(){d.style.display="",d.style.position="",d.style.top="",d.style.left="",d.style.height="",d.style.width="",d.style.zIndex="",d.style.backgroundColor="",d.style.overflow="",d.style.marginLeft="",d.style.paddingLeft="",c.style.visibility="hidden"})}var j=window.location.href,k=j.indexOf("?"),l=j.substring(k+1),m=void 0,o="",p=k&&-1!=l.indexOf("debug=true");p&&(window.addEventListener("error",c),["log","debug","info","warn","error"].forEach(function(a){console[a]=function(a,c){return function(){a.apply(console,arguments),o=o+"CONSOLE:"+c+": "+Array.prototype.slice.call(arguments).join(" "),b()}}(console[a],a)}));var a=[ROOTDIR+"assets/css/"+"common.css",ROOTDIR+"assets/css/"+"layout.css",ROOTDIR+"assets/css/"+"light.css",ROOTDIR+"assets/css/"+"dark.css",ROOTDIR+"assets/css/"+"unhide.css"],q=document.querySelector("head"),r=document.getElementById("csshook"),s=nameDefaults.theme;Modernizr.localstorage?(function(){for(n in nameDefaults){var a="name-pref-"+n,b=localStorage.getItem(a);b?Hook(a,b):"theme"==n&&Hook(a,nameDefaults[n])}}(),Modernizr.mediaqueryevent_1&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(){var a=localStorage.getItem("name-pref-theme");a&&a!=s||Hook("name-pref-theme",s)})):Hook("name-pref-theme",s),function(){"-1"!==CSSVER&&Modernizr.promises&&Modernizr.cache_1&&Modernizr.arrow&&Modernizr.localstorage?g():f()}(),window.addEventListener("DOMContentLoaded",h)})();