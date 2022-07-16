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
		show_el.media = "not all"
		if (value === "pref-theme-dark") {
			is_dark = true
		} else if (value == "pref-theme-light") {
			is_dark = false
		} else if (value != "pref-theme-default") {
			return
		}
		dark_el.media = is_dark ? "all" : "not all";
		light_el.media = is_dark ? "not all" : "all";
		show_el.media = "all"
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
	window.addEventListener('DOMContentLoaded', l);
	function l() {
function Hook_doall() {
	for (name_trunc in nameDefaults) {
		var name_full = "name-pref-" + name_trunc
		var value = localStorage.getItem(name_full)
		if (value) {
			Hook(name_full, value)
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
	}
})()
