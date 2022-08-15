Modernizr.addTest('cssvar_1', 'CSS' in window && 'supports' in window.CSS && window.CSS.supports('(--foo: red)'))
Modernizr.addTest('mediaqueryevent_1', function(){ var res = false; try {res = MediaQueryList && MediaQueryList.prototype instanceof EventTarget} catch(e) {} return res})
Modernizr.addTest('es6_object_entries_1', 'entries' in Object)
Modernizr.addTest('cache_1', 'Cache' in window && 'CacheStorage' in window && 'caches' in window)
var gcs_deps = {
	"cssvar_1": "",
	"mediaqueryevent_1": "",
	"classlist": "",
	"localstorage": "",
	"urlparser": "",
	"es6object": "",
	"es6_object_entries_1": "",
	"json": ""
}
var gcs_missing = ""
for (i in gcs_deps) {
	if (!Modernizr[i]) {
		if (gcs_missing) {
			gcs_missing += ","
		}
		gcs_missing += i
	}
}
var cssId = 'csscommon';
var nameDefaults = {
	"font": "pref-font-default",
	"monofont": "pref-monofont-default",
	"theme": "pref-theme-default",
	"fontsize": "pref-fontsize-default",
	"fontsize-selectelm": "default",
	"monofontsize": "pref-monofontsize-default",
	"monofontsize-selectelm": "default"
}
var hookJson = {
	"ff": "",
	"fs": ""
}
function NoteEl(level, message) {
	var notice_el = document.createElement('div')
	var class_str ="note " + level
	notice_el.setAttribute("class", class_str)
	notice_el.textContent = message
	return notice_el
}
function Hook(name_full, value) {
	var rootElement = document.documentElement
	var hookElement = document.getElementById('csshook')
	function Json2CSSHook() {
		var fontFamily = hookJson.ff
		var fontSize = hookJson.fs
		var str = ""
		if (fontFamily) {
			str += 'pre,code{font-family:' + fontFamily + ';}'
		}
		if (fontSize) {
			str += 'pre,code{font-size:' + fontSize + ';}'
		}
		hookElement.textContent = str
	}
	function PrefFontCb(value) {
		var FontFamily_dict = {
			"pref-font-default": {"fontFamily": ""},
			"pref-font-brand": {"fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif"},
			"pref-font-system-ui": {"fontFamily": "system-ui, sans"}
		}
		if (value == "pref-font-default") {
			rootElement.style.lineHeight = ""
			rootElement.style.fontFamily = ""
			return
		}
		if (value in FontFamily_dict) {
			var ff = FontFamily_dict[value].fontFamily
			if (ff) {
				rootElement.style.fontFamily = ff
			}
		} else {
			return
		}
	}
	function PrefMonoFontCb(value) {
		var MonoFontFamily_dict = {
			"pref-monofont-default": "",
			"pref-monofont-brand": "SFMono-Regular,SF Mono,Menlo,Consolas,Monaco,Lucida Console,Liberation Mono,Cousine,monospace",
			"pref-monofont-fallback": "ui-monospace,monospace"
		}
		if (value in MonoFontFamily_dict) {
			var ff = MonoFontFamily_dict[value]
			hookJson.ff = ff
		} else {
			return
		}
		Json2CSSHook()
	}
	function PrefThemeCb(value) {
		if (!Modernizr.classlist || !Modernizr.mediaqueries) {
			return
		}
		var is_dark = window.matchMedia('(prefers-color-scheme: dark)').matches
		if (value === "pref-theme-dark") {
			is_dark = true
		} else if (value == "pref-theme-light") {
			is_dark = false
		} else if (value != "pref-theme-default") {
			return
		}
		if (is_dark) {
			rootElement.classList.add('dark')
			rootElement.style.colorScheme = 'dark'
		} else {
			rootElement.classList.remove('dark')
			rootElement.style.colorScheme = 'light'
		}
	}
	function PrefFontSize_Parse(rawval) {
		return rawval && rawval !== "default" ? rawval.substring(0, 4) : ""
	}
	function PrefSetFs(fs) {
		rootElement.style.fontSize = fs
	}
	function PrefMonoSetFs(fs) {
		hookJson.fs = fs
		Json2CSSHook()
	}
	function PrefFontSizeCb(value) {
		var set_to_default = value === "pref-fontsize-default" || (!value)
		var fs = set_to_default ? "" : PrefFontSize_Parse(localStorage.getItem("name-pref-fontsize-selectelm"))
		PrefSetFs(fs)
	}
	function PrefFontSizeSelectCb(value) {
		if (localStorage.getItem("name-pref-fontsize") != "pref-fontsize-custom") {
			return
		}
		var fs = PrefFontSize_Parse(value)
		PrefSetFs(fs)
	}
	function PrefMonoFontSizeCb(value) {
		var set_to_default = value === "pref-monofontsize-default" || (!value)
		var fs = set_to_default ? "" : PrefFontSize_Parse(localStorage.getItem("name-pref-monofontsize-selectelm"))
		PrefMonoSetFs(fs)
	}
	function PrefMonoFontSizeSelectCb(value) {
		if (localStorage.getItem("name-pref-monofontsize") != "pref-monofontsize-custom") {
			return
		}
		var fs = PrefFontSize_Parse(value)
		PrefMonoSetFs(fs)
	}
	var HookCb_dict = {
		"font": PrefFontCb,
		"monofont": PrefMonoFontCb,
		"theme": PrefThemeCb,
		"fontsize": PrefFontSizeCb,
		"fontsize-selectelm": PrefFontSizeSelectCb,
		"monofontsize": PrefMonoFontSizeCb,
		"monofontsize-selectelm": PrefMonoFontSizeSelectCb
	}
	var name_trunc = name_full.substring(10)
	var cbfunc = HookCb_dict[name_trunc]
	if (value) {
		cbfunc && cbfunc(value)
	}
}
function gcs_theme() {
	var use_prefered = true;
	var no_prefered_use_light = true;
	if (Modernizr.localstorage) {
		var th = localStorage.getItem("name-pref-theme")
		if (th == "pref-theme-light") {
			use_prefered = false;
			use_light = true;
		} else if (th == "pref-theme-dark") {
			use_prefered = false;
			no_prefered_use_light = false;
		}
	}
	return use_prefered ? "preferred_color_scheme" : no_prefered_use_light ? "light" : "dark"
}
(function(){
var l1 = window.location.href
var query_index = l1.indexOf('?')
var querys = l1.substring(query_index + 1)
var ftel = undefined
var log = ""
var a = query_index && querys.indexOf('debug=true') != -1
function ftel_set() { if(ftel) ftel.textContent = log }
if (a) {
	window.addEventListener('error', function(e) {
		log = log + e.type + ':' + e.message + '\n'
		log = log + (e.target && e.target.outerHTML ? e.target.outerHTML : "")  + '\n'
		ftel_set()
	}); /* This semicolon is REQUIRED */
	/* https://stackoverflow.com/a/43725214 */
	['log','debug','info','warn','error'].forEach(function (verb) {
		console[verb] = (function (method, verb) {
		    return function () {
			method.apply(console, arguments);
			log = log + "CONSOLE:" + verb + ': ' + Array.prototype.slice.call(arguments).join(' ');
			ftel_set()
		};
		})(console[verb], verb);
	});
}
var css_dir = "assets/css/"
var css_common = "common.css"
var css_layout = "layout.css"
var css_dark = "dark.css"
var css_light = "light.css"
var csspath_common = ROOTDIR + css_dir + css_common
var csspath_layout = ROOTDIR + css_dir + css_layout
var csspath_light = ROOTDIR + css_dir + css_light 
var csspath_dark = ROOTDIR + css_dir + css_dark

var head = document.querySelector('head')
var hookElement = document.getElementById('csshook')

function head_add_link(url) {
	var el = document.createElement('link')
	el.setAttribute("rel", "stylesheet")
	el.setAttribute("href", url)
	head.insertBefore(el, hookElement);
}
function load_css_link_element() {
	head_add_link(csspath_common)
	head_add_link(csspath_layout)
	head_add_link(csspath_light)
	head_add_link(csspath_dark)
}
function load_css_cache() {
	
}
function load_css() {
	if (Modernizr.promises && Modernizr.cache_1) {
		load_css_cache()
	} else {
		load_css_link_element()
	}
}
load_css();

window.addEventListener('DOMContentLoaded', dom_loader);
function dom_loader() {
if (a) {
	ftel = document.getElementById('debug-log')
	ftel.textContent = log
}
function Hook_doall() {
	/* JSCompress don't compress variable name in for (xxx in yyy). Use very short name here */
	for (n in nameDefaults) {
		var name_full = "name-pref-" + n
		var value = localStorage.getItem(name_full)
		if (value) {
			Hook(name_full, value)
		} else if (n == 'theme') { /* Hook for theme is mandatory */
			Hook(name_full, nameDefaults[n])
		}
	}
}
var show_el = document.getElementById(cssId + 'show')
if (show_el) {
	show_el.textContent = "html{visibility:visible;opacity:1}"
}
var theme_default = nameDefaults["theme"]
if (Modernizr.localstorage) {
	Hook_doall()
	if (Modernizr.mediaqueryevent_1) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", function(e) {
			var theme = localStorage.getItem("name-pref-theme")
			if (!theme || theme == theme_default) {
				Hook("name-pref-theme", theme_default)
			}
		})
	}
} else {
	Hook("name-pref-theme", theme_default)
}
var sw = document.querySelector('.search-wrapper')
if (sw) {
	sw.style.display = ""
}
var ov = document.getElementById("overlay")
var nv = document.querySelector(".wrapper nav.nav-toc")
var lt = document.getElementById("list")
function current_dark() {
	return document.documentElement.classList.contains("dark")
}
function set() {
	nv.style.display = "block"
	nv.style.position = "fixed"
	nv.style.top = 0
	nv.style.left = 0
	nv.style.height = "100vh" /* __hardcode__ nav height */
	nv.style.width = "80vw" /* __hardcode__ nav width */
	nv.style.zIndex = 3
	nv.style.backgroundColor = current_dark() ? "#111" : "#fafafa" /* __hardcode__ background color */
	nv.style.overflow = "scroll"
	nv.style.marginLeft = 0
	nv.style.paddingLeft = "1rem"
	ov.style.visibility = ""
}
function unset() {
	nv.style.display = ""
	nv.style.position = ""
	nv.style.top = ""
	nv.style.left = ""
	nv.style.height = ""
	nv.style.width = ""
	nv.style.zIndex = ""
	nv.style.backgroundColor = ""
	nv.style.overflow = ""
	nv.style.marginLeft = ""
	nv.style.paddingLeft = ""
	ov.style.visibility = "hidden"
}
lt.addEventListener("click", set)
ov.addEventListener("click", unset)
	}
})()
