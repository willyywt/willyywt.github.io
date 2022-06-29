pref_input_el_arr = document.getElementsByTagName("input");
function input_changed_cb(ev) {
  var val = ev.target.value
  var name = ev.target.name
  CookieLevelHook(name, val)
}
for (var el_index = 0; el_index < pref_input_el_arr.length; el_index += 1) {
  var el = pref_input_el_arr[el_index]
  el.addEventListener('change', input_changed_cb)
}
var LegendDefault_map = {
	"name-pref-font": "pref-font-default",
	"name-pref-theme": "pref-theme-default"
}
function CookieChangeHook(name, value) {
  CookieLevelHook(name, val)
  if(LegendDefault_map[name] === val) {
	  cookie_json[name] = ""
  } else {
	  cookie_json[name] = val
  }
  Json2Cookie()
}
function PrefLegendCheckSync() {
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
}
PrefLegendCheckSync()
