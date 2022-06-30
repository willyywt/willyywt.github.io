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
function CookieChangeHook(name, val) {
	var LegendDefault_map = {
		"name-pref-font": "pref-font-default",
		"name-pref-theme": "pref-theme-default"
	}
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
function input_changed_cb(ev) {
	var val = ev.target.value
	var name = ev.target.name
	CookieChangeHook(name, val)
}
for (var el_index = 0; el_index < pref_input_el_arr.length; el_index += 1) {
	var el = pref_input_el_arr[el_index]
	el.addEventListener('change', input_changed_cb)
}
function Json2Cookie() {
	for (key in cookie_json) {
		Json2Cookie_one(key, cookie_json[key])
	}
}
/* PrefLegendCheckSync() */
var LegendName_arr = ["name-pref-font", "name-pref-theme"]
for (var name_index = 0; name_index < LegendName_arr.length; name_index += 1) {
	var name = LegendName_arr[name_index]
	var value = cookie_json[name]
	console.log(name, value)
	var input_el = document.getElementById(value)
	console.log(input_el)
	if (input_el) {
		input_el.checked = true
	}
}
})()

