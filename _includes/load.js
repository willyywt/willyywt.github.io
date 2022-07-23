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
			"pref-font-default": {"lineHeight": "", "fontFamily": ""},
			"pref-font-brand": {"lineHeight": "1.5", "fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif"},
			"pref-font-system-ui": {"lineHeight": "1.5", "fontFamily": "system-ui, sans"}
		}
		if (value == "pref-font-default") {
			rootElement.style.lineHeight = ""
			rootElement.style.fontFamily = ""
			return
		}
		if (value in FontFamily_dict) {
			var lh = FontFamily_dict[value].lineHeight
			if (lh) {
				rootElement.style.lineHeight = lh
			}
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
		var main_el = document.getElementById(cssId)
		var light_el = document.getElementById('csslight')
		var dark_el = document.getElementById('cssdark')
		var show_el = document.getElementById(cssId + 'show')
		if (!main_el || !show_el || !dark_el || !light_el) {2
			return
		}
		var is_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		if (value === "pref-theme-dark") {
			is_dark = true
		} else if (value == "pref-theme-light") {
			is_dark = false
		} else if (value != "pref-theme-default") {
			return
		}
		if (is_dark) {
			rootElement.classList.add('dark')
		} else {
			rootElement.classList.remove('dark')
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
(function(){
var l1 = window.location.href
var query_index = l1.indexOf('?')
var querys = l1.substring(query_index + 1)
var ftel = undefined
var log = ""
var a = query_index && querys.indexOf('debug=true') != -1
if (a) {
	window.addEventListener('error', function(e) {
		log = log + e.type + ':' + e.message + '\n'
		log = log + (e.target && e.target.outerHTML ? e.target.outerHTML : "")  + '\n'
		if(ftel) ftel.textContent = log
	})
}
window.addEventListener('DOMContentLoaded', l);
function l() {
if (a) {
	ftel = document.getElementById('debug-log')
	ftel.textContent = log
}
function Hook_doall() {
	for (name_trunc in nameDefaults) {
		var name_full = "name-pref-" + name_trunc
		var value = localStorage.getItem(name_full)
		if (value) {
			Hook(name_full, value)
		} else if (name_trunc == 'theme') { /* Hook for theme is mandatory */
			Hook(name_full, nameDefaults[name_trunc])
		}
	}
}
var show_el = document.getElementById(cssId + 'show')
if (show_el) {
	show_el.textContent = "html{visibility:visible;opacity:1}"
}
if (Modernizr.localstorage) {
Hook_doall()
}
document.getElementsByClassName('search-wrapper')[0].style.display=""
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
	nv.style.height = "100%"
	nv.style.width = "80%"
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
