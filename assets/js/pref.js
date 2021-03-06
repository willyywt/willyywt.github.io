/* @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat License */
(function(){
	window.addEventListener('DOMContentLoaded', l);
	function l(){
if (!Modernizr.localstorage) {
	return
}
function InputHook(name, val) {
	Hook(name, val)
	var name_trunc = name.substring(10)
	if(nameDefaults[name_trunc] === val || !val) {
		localStorage.removeItem(name)
	} else {
		localStorage.setItem(name, val)
	}	
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
function MonoSetEnable(value) {
	var monofontsize_select_el = document.getElementById("pref-monofontsize-selectelm")
	if(!monofontsize_select_el) {
		return
	}
	if (value === "pref-monofontsize-default") {
		monofontsize_select_el.disabled = true;
	} else {
		monofontsize_select_el.disabled = false;
	}	
}
function input_changed_cb(ev) {
	var val = ev.target.value
	var name = ev.target.name
	console.log(name, val)
	if(name === "name-pref-fontsize") {
		InputSetEnable(val)
	} else if (name == "name-pref-monofontsize") {
		MonoSetEnable(val)
	}
	InputHook(name, val)
}
for (var el_index = 0; el_index < pref_input_el_arr.length; el_index += 1) {
	var el = pref_input_el_arr[el_index]
	el.addEventListener('change', input_changed_cb)
}
for (var el_index = 0; el_index < pref_select_el_arr.length; el_index += 1) {
	var el = pref_select_el_arr[el_index]
	el.addEventListener('change', input_changed_cb)
}
/* PrefLegendCheckSync() */
for (name_trunc in nameDefaults) {
	var name_full = "name-pref-" + name_trunc
	var value = localStorage.getItem(name_full)
	if (value) {
		var input_el = document.getElementById(value)
		if (input_el) {
			input_el.checked = true
		}
	}
}
/* InputCheckSync() */
var pf = localStorage.getItem("name-pref-fontsize")
pf && InputSetEnable(pf)
var mnpf = localStorage.getItem("name-pref-monofontsize")
mnpf && MonoSetEnable(mnpf)
/* SelectCheckSync() */
var fontsize_select_el = document.getElementById("pref-fontsize-selectelm")
if (fontsize_select_el) {
	fontsize_select_el.value = localStorage.getItem("name-pref-fontsize-selectelm")
}
var monofontsize_select_el = document.getElementById("pref-monofontsize-selectelm")
if (monofontsize_select_el) {
	monofontsize_select_el.value = localStorage.getItem("name-pref-monofontsize-selectelm")
}
}
})()
/* @license-end */
