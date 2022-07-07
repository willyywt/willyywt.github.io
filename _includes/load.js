var cssId = 'csscommon';
var nameDefaults = {
	"name-pref-font": "pref-font-default",
	"name-pref-theme": "pref-theme-default",
	"name-pref-fontsize": "pref-fontsize-default",
	"name-pref-fontsize-selectelm": "default"
}
function Hook(name, value) {
	var rootElement = document.body
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
	var HookCb_dict = {
		"name-pref-font": PrefFontCb,
		"name-pref-theme": PrefThemeCb,
		"name-pref-fontsize": PrefFontSizeCb,
		"name-pref-fontsize-selectelm": PrefFontSizeSelectCb
	}
	var cbfunc = HookCb_dict[name]
	if (value) {
		cbfunc && cbfunc(value)
	}
}
(function(){
	window.addEventListener('DOMContentLoaded', l);
	function l() {
function Hook_doall() {
	for (name in nameDefaults) {
		var value = localStorage.getItem(name)
		if (value) {
			Hook(name, value)
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
	}
})()
