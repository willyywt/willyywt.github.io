(function(){
function Json2Cookie_one(key, value_unenc) {
	var cookie_str_1 = ""
	if (value_unenc) {
		var value = encodeURIComponent(value_unenc)
		cookie_str_1 = key.concat("=", value, "; ")
		cookie_str_1 += "Path=/; SameSite=None; Max-Age=851472000; Secure"
	} else {
		/* Makes cookie expire immediately */
		var value = ""
		cookie_str_1 = key + "=; Path=/; SameSite=None; Max-Age=0; Secure"
	}
	document.cookie = cookie_str_1
}
var LegendDefault_map = {
	"name-pref-font": "pref-font-default",
	"name-pref-theme": "pref-theme-default",
	"name-pref-fontsize": "pref-fontsize-default",
	"name-pref-fontsize-selectelm": "default"
}
function CookieChangeHook(name, val) {
	CookieLevelHook(name, val)
	if(LegendDefault_map[name] === val) {
		cookie_json[name] = ""
	} else {
		cookie_json[name] = val
	}
	Json2Cookie()
}
/* PrefSetCb() */
pref_input_el_arr = document.getElementsByTagName("input");
pref_select_el_arr = document.getElementsByTagName("select");
function InputSetEnable(value) {
	var fontsize_select_el = document.getElementById("pref-fontsize-selectelm")
	if(!fontsize_select_el) {
		return
	}
	if (value === "pref-fontsize-default") {
		fontsize_select_el.disabled = true;
	} else {
		fontsize_select_el.disabled = false;
	}		
}
function SelectCheckSync() {

}
function input_changed_cb(ev) {
	var val = ev.target.value
	var name = ev.target.name
	console.log(name, val)
	if(name === "name-pref-fontsize") {
		InputSetEnable(val)
	}
	CookieChangeHook(name, val)
}
for (var el_index = 0; el_index < pref_input_el_arr.length; el_index += 1) {
	var el = pref_input_el_arr[el_index]
	el.addEventListener('change', input_changed_cb)
}
for (var el_index = 0; el_index < pref_select_el_arr.length; el_index += 1) {
	var el = pref_select_el_arr[el_index]
	el.addEventListener('change', input_changed_cb)
}
function Json2Cookie() {
	for (key in cookie_json) {
		Json2Cookie_one(key, cookie_json[key])
	}
}
/* PrefLegendCheckSync() */
for (name in LegendDefault_map) {
	var value = CookieGetKey(name)
	if (value) {
		var input_el = document.getElementById(value)
		if (input_el) {
			input_el.checked = true
		}
	}
}
/* InputCheckSync() */
var pf = CookieGetKey("name-pref-fontsize")
pf && InputSetEnable(pf)
/* SelectCheckSync() */
var fontsize_select_el = document.getElementById("pref-fontsize-selectelm")
if (fontsize_select_el) {
	fontsize_select_el.value = CookieGetKey("name-pref-fontsize-selectelm")
}
})()

