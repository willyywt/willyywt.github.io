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
var PrefDefaults = {
	"font": "default",
	"monofont": "default",
	"theme": "default",
	"fontsize": "default",
	"fontsize-selectelm": "default",
	"monofontsize": "default",
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
function PrefGet(name) {
  return localStorage.getItem("pref-" + name)
}
/** 
 * Hook(name, value): Apply preference settings. Automatically called at page load and at preference change.
 * This function do not write to localStorage in anyway: localStorage is read-only to Hook().
 * This function is idempotent: calling it with the same parameter will achieve the same result.
 * @name
 * The preference name. Passing an unrecognized name will do nothing.
 * @value
 * The value. Calling Hook() with default value causes the default setting to be immediately applied
 * (which means to clear any previous user settings). This is different from calling Hook() with value===null which does nothing.
 * Passing an unrecognized value will also do nothing. (Check for "unrecognized value" not yet implemented for font size and font name)
 * @returns
 * undefined
 */
function Hook(name, value) {
	var rootElement = document.documentElement
	var hookElement = document.getElementById('csshook')
	function Json2CSSHook() {
		var fontFamily = hookJson.ff
		var fontSize = hookJson.fs
		var str = ""
		if (fontFamily) {
			str += 'pre,code,.text-monospace{font-family:' + fontFamily + ';}'
		}
		if (fontSize) {
			str += 'pre,code,.text-monospace{font-size:' + fontSize + ';}'
		}
		hookElement.textContent = str
	}
	function PrefFontCb(value) {
		var FontFamily_dict = {
			"default": {"fontFamily": ""},
			"brand": {"fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif"},
			"system-ui": {"fontFamily": "system-ui, sans"}
		}
    if (!(value in FontFamily_dict)) {
      return
    } 
		if (value == "default") {
			rootElement.style.lineHeight = ""
			rootElement.style.fontFamily = ""
			return
		}
    var ff = FontFamily_dict[value].fontFamily
    if (ff) {
      rootElement.style.fontFamily = ff
    }
	}
	function PrefMonoFontCb(value) {
		var MonoFontFamily_dict = {
			"default": "",
			"brand": "SFMono-Regular,SF Mono,Menlo,Consolas,Monaco,Lucida Console,Liberation Mono,Cousine,monospace",
			"fallback": "ui-monospace,monospace"
		}
    if (!(value in MonoFontFamily_dict)) {
      return
    }
    var ff = MonoFontFamily_dict[value]
    hookJson.ff = ff
		Json2CSSHook()
	}
	function PrefThemeCb(value) {
		if (!Modernizr.classlist || !Modernizr.mediaqueries) {
			return
		}
		var is_dark = window.matchMedia('(prefers-color-scheme: dark)').matches
		if (value === "dark") {
			is_dark = true
		} else if (value === "light") {
			is_dark = false
		} else if (value !== "default") {
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
		var set_to_default = true;
    if (value === "custom") {
      set_to_default = false;
    } else if (value !== "default") {
      return
    }
		var fs = set_to_default ? "" : PrefFontSize_Parse(PrefGet("fontsize-selectelm"))
		PrefSetFs(fs)
	}
	function PrefFontSizeSelectCb(value) {
		if (PrefGet("fontsize") != "custom") {
			return
		}
		var fs = PrefFontSize_Parse(value)
		PrefSetFs(fs)
	}
	function PrefMonoFontSizeCb(value) {
    var set_to_default = true;
    if (value === "custom") {
      set_to_default = false;
    } else if (value !== "default") {
      return;
    }
		var fs = set_to_default ? "" : PrefFontSize_Parse(PrefGet("monofontsize-selectelm"))
		PrefMonoSetFs(fs)
	}
	function PrefMonoFontSizeSelectCb(value) {
		if (PrefGet("monofontsize") != "custom") {
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
	var cbfunc = HookCb_dict[name]
	if (value) {
		cbfunc && cbfunc(value)
	}
}
function gcs_theme() {
	var use_prefered = true;
	var no_prefered_use_light = true;
	if (Modernizr.localstorage) {
		var th = PrefGet("theme")
		if (th == "light") {
			use_prefered = false;
			use_light = true;
		} else if (th == "dark") {
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
function ftel_log(e) {
	log = log + e.type + ':' + e.message + '\n'
	log = log + (e.target && e.target.outerHTML ? e.target.outerHTML : "")  + '\n'
	ftel_set()
}
if (a) {
	window.addEventListener('error', ftel_log); /* This semicolon is REQUIRED */
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
var css_unhide = "unhide.css"
var csspaths = [ROOTDIR + css_dir + css_common, ROOTDIR + css_dir + css_layout, ROOTDIR + css_dir + css_light, ROOTDIR + css_dir + css_dark, ROOTDIR + css_dir + css_unhide]

var head = document.querySelector('head')
var hookElement = document.getElementById('csshook')

function head_add_link(url) {
	var el = document.createElement('link')
	el.setAttribute("rel", "stylesheet")
	el.setAttribute("href", url)
	head.insertBefore(el, hookElement);
}
function head_add_style(str) {
	var el = document.createElement('style')
	el.textContent = str
	head.insertBefore(el, hookElement)
}
function load_css_link_element() {
	for (i in csspaths) {
		head_add_link(csspaths[i])
	}
}
function load_css_cache() {
	caches.open('v1')
	.then(function(cache) {
		var pm_arr = []
		if (localStorage.getItem("CSSVER") !== CSSVER) {
			for (i in csspaths) {
				pm_arr.push(cache.delete(csspaths[i]))
			}
		}
    Promise.all(pm_arr).then(function(){
      localStorage.setItem("CSSVER", CSSVER)
      load_css_cache_2(cache)
    })
  }).catch(function(e) {
    load_css_link_element()
    ftel_log(e)
  })
}
function load_css_cache_2(cache) {
  var pm_arr = []
  for (i in csspaths) {
    pm_arr.push(cache.match(csspaths[i]))
  }
  Promise.all(pm_arr)
  .then(function(res_arr) {
    var has_cache_all = true
    for (i in res_arr) {
      var res = res_arr[i]
      if (!res || !res.ok) {
        has_cache_all = false
        break
      }
    }
    if (has_cache_all) {
      var pm_css_text = []
      for (i in res_arr) {
        var res = res_arr[i]
        pm_css_text.push(res.text())
      }
      Promise.all(pm_css_text)
      .then(function(css_text_arr) {
        for (i in res_arr) {
          head_add_style(css_text_arr[i])
        }
      })
    } else {
      load_css_link_element()
      for (i in csspaths) {
        cache.add(csspaths[i])
      }
    }
  }).catch(function(e) {
    /* This path should not be reachable! */ 
    return Promise.reject(e)
  })
}
function load_css() {
	if (CSSVER !== "-1" && Modernizr.promises && Modernizr.cache_1 && Modernizr.arrow && Modernizr.localstorage) {
		load_css_cache()
	} else {
		load_css_link_element()
	}
}
function Hook_doall() {
	/* JSCompress don't compress variable name in for (xxx in yyy). Use very short name here */
	for (n in PrefDefaults) {
		var value = PrefGet(n)
		if (value) {
			Hook(n, value)
		} else if (n == 'theme') { /* Hook for theme is mandatory */
			Hook(n, PrefDefaults[n])
		}
	}
}
var theme_default = PrefDefaults["theme"]
if (Modernizr.localstorage) {
	Hook_doall()
	if (Modernizr.mediaqueryevent_1) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", function(e) {
			var theme = PrefGet("theme")
			if (!theme || theme == theme_default) {
				Hook("theme", theme_default)
			}
		})
	}
} else {
	Hook("theme", theme_default)
}
load_css();

window.addEventListener('DOMContentLoaded', dom_loader);
function dom_loader() {
if (a) {
	ftel = document.getElementById('debug-log')
	ftel.textContent = log
}
var sw = document.getElementById('search-wrapper')
if (sw) {
	sw.style.display = ""
}
var ov = document.getElementById("overlay")
var nv = document.getElementById("nav-toc")
var lt = document.getElementById("list")
var ltc = document.getElementById("list-close")
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
	ltc.style.display = ""
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
	ltc.style.display = "none"
}
function enter_cb(event, func) {
	if (event.isComposing || event.keyCode == 223) {
		return;
	}
	if (event.keyCode == 13) {
		func()
	}
}
function enter_cb_set(event) {
	enter_cb(event, set)
}
function enter_cb_unset(event) {
	enter_cb(event, unset)
}
lt.addEventListener("click", set)
ov.addEventListener("click", unset)
lt.addEventListener("keydown", enter_cb_set)
ltc.addEventListener("click", unset)
ltc.addEventListener("keydown", enter_cb_unset)
	}
})()
