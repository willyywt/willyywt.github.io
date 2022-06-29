pref_input_el_arr = document.getElementsByTagName("input");
function input_changed_cb(ev) {
  var val = ev.target.value
  var name = ev.target.name
  cookie_json[name] = val
  Json2Cookie()
  CookieLevelHook(name, val)
}
for (var el_index = 0; el_index < pref_input_el_arr.length; el_index += 1) {
  var el = pref_input_el_arr[el_index]
  el.addEventListener('change', input_changed_cb)
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
