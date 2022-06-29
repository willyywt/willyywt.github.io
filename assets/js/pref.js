pref_input_el_arr = document.getElementsByTagName("input");
function input_changed_cb(ev) {
  var val = ev.target.value
  var name = ev.target.name
  cookie_json[name] = val
  Json2Cookie()
  CookieLevelHook(name, val)
}
for (el of pref_input_el_arr) {
  el.addEventListener('change', input_changed_cb)
}
function PrefLegendCheckSync() {
  for (name of LegendName_arr) {
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
