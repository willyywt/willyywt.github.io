var cookie_json = {}
var cssId = 'csscommon';
var csshookId = 'hookcss';
var csshookId_fs = 'hookcssfs'
function CookieGetKey(key) {
	var has_key = (key in cookie_json) ? ((cookie_json[key]) ? true : false): false;
	return has_key ? cookie_json[key] : ""
}
function Cookie2Json() {
	function CookieParsePair(start) {
		var c_start = start
		var c_end = start
		var result = {"index": start, "key": "", "value": ""}
		if (document.cookie.length == 0) {
			return result
		}
		c_start = document.cookie.indexOf("=", start)
		if (c_start == -1) {
			return result
		}
		c_end = document.cookie.indexOf(";", c_start + 1)
		if (c_end == -1) {
			c_end = document.cookie.length
		}
		result.index = c_end + 2; // Jump "; "
		result.key = document.cookie.substring(start, c_start)
		result.value = document.cookie.substring(c_start + 1, c_end)
		return result
	}
	var index_start = 0;
	while (index_start < document.cookie.length) {
		var parse_result = CookieParsePair(index_start)
		if (parse_result.key.length == 0 || parse_result.index <= index_start) {
			return
		}
		index_start = parse_result.index
		var key = parse_result.key
		var val = parse_result.value
		cookie_json[key] = decodeURIComponent(val)
	}
}
function CookieLevelHook(name, value) {
	function PrefFontCb(value) {
		var FontFamily_dict = {
			"pref-font-default": {"lineHeight": "", "fontFamily": ""},
			"pref-font-brand": {"lineHeight": "1.5", "fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif"},
			"pref-font-system-ui": {"lineHeight": "1.5", "fontFamily": "system-ui, sans"}
		}
		var csshook_el = document.getElementById(csshookId)
		if (value == "pref-font-default") {
			csshook_el.textContent = ""
			return
		}
		var css_str = "html,body{"
		if (value in FontFamily_dict) {
			var lh = FontFamily_dict[value].lineHeight
			if (lh) {
				css_str += "line-height: "
				css_str += lh
				css_str += ";"
			}
			var ff = FontFamily_dict[value].fontFamily
			if (ff) {
				css_str += "font-family: "
				css_str += ff
				css_str += ";"
			}
			css_str += "}"
		} else {
			return
		}
		csshook_el.textContent = css_str
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
	function PrefFontSizeCb(value) {
		var hookfs_el = document.getElementById(csshookId_fs)
		var set_to_default = value === "pref-fontsize-default"
		var set_to_custom = value === "pref-fontsize-custom"
		var set_str = ""
		var fs = set_to_default ?
				"" // Set to default
				:set_to_custom ?
				PrefFontSize_Parse(CookieGetKey("name-pref-fontsize-selectelm")) // Set to custom; Not selecting size
				: PrefFontSize_Parse(value) //Not setting to custom; Selecting size
		if (fs) {
			set_str = "html,body{font-size:" + fs + ";}"
		}
		hookfs_el.textContent = set_str
	}
	var CookieLevelHookCb_dict = {
		"name-pref-font": PrefFontCb,
		"name-pref-theme": PrefThemeCb,
		"name-pref-fontsize": PrefFontSizeCb,
		"name-pref-fontsize-selectelm": PrefFontSizeCb
	}
	var cbfunc = CookieLevelHookCb_dict[name]
	if (value) {
		cbfunc && cbfunc(value)
	}
}
(function(){
function CookieLevelHook_doall() {
	for (name in cookie_json) {
		var value = cookie_json[name]
		if (value) {
			CookieLevelHook(name, value)
		}
	}
}
function StyleInsertStyle(conf) {
	var head = document.getElementsByTagName('head')[0]
	var style = document.createElement('style')
	style.id = conf.id
	style.textContent = conf.textContent || ''
	head.appendChild(style);
}
if (!document.getElementById(csshookId))
{
	StyleInsertStyle({
		"id": csshookId
	})
	StyleInsertStyle({"id": csshookId_fs})
}
var show_el = document.getElementById(cssId + 'show')
if (show_el) {
	show_el.media = "all"
}
if (document.cookie.length > 0) {
Cookie2Json()
CookieLevelHook_doall()
}
})()
