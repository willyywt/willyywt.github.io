/* @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat License */
(function(){
window.addEventListener('DOMContentLoaded', l);
function l() {
var mel = document.querySelector("main")
var mel_h1 = document.querySelector("main h1")
if(!Modernizr.localstorage) {
  var errlocalel = NoteEl("error", "Preferences are unavaliable because your browser does not support localStorage.")
  mel.insertBefore(errlocalel, mel_h1.nextSibling)
  return
}
if(!Modernizr.classlist) {
  var mel_th = document.getElementById("theme")
  var errclst = NoteEl("error", "Theme cannot be changed because your browser does not support classList.")
  mel.insertBefore(errclst, mel_th.nextSibling)
}
function GCSReload() {
	/* Try reloading giscus iframe. Due to XSS related restrictions we cannot modify anything in iframe. */
	var ifel = document.querySelector("iframe.giscus-frame")
	if (!ifel) {
		return
	}
	var urlobj = new URL(ifel.src)
	ifel.contentWindow.postMessage({
		giscus: {
			setConfig: {
				theme: gcs_theme()
			}
		}
	}, urlobj.origin)
}
function InputHook(name, val) {
	Hook(name, val)
	var name_trunc = name.substring(4)
	if(nameDefaults[name_trunc] === val || !val) {
		localStorage.removeItem(name)
	} else {
		localStorage.setItem(name, val)
	}
	if (name_trunc === "theme" && gcs_missing === "") {
		GCSReload()
	}
}
/* PrefSetCb() */
pref_input_el_arr = document.getElementsByTagName("input");
pref_select_el_arr = document.getElementsByTagName("select");
function InputSetEnable(value) {
	var fontsize_select_el = document.getElementById("id--fontsize-selectelm")
	if(!fontsize_select_el) {
		return
	}
	if (value === "default") {
		fontsize_select_el.disabled = true;
	} else {
		fontsize_select_el.disabled = false;
	}		
}
function MonoSetEnable(value) {
	var monofontsize_select_el = document.getElementById("id--monofontsize-selectelm")
	if(!monofontsize_select_el) {
		return
	}
	if (value === "default") {
		monofontsize_select_el.disabled = true;
	} else {
		monofontsize_select_el.disabled = false;
	}	
}
function input_changed_cb(ev) {
	var val = ev.target.value
	var name = ev.target.name
	console.log(name, val)
	if(name === "pref-fontsize") {
		InputSetEnable(val)
	} else if (name == "pref-monofontsize") {
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
	var name_full = "pref-" + name_trunc
	var value = localStorage.getItem(name_full)
	if (value) {
		var input_el = document.getElementById("id--" + name_trunc + value)
		if (input_el) {
			input_el.checked = true
		}
	}
}
/* InputCheckSync() */
var pf = localStorage.getItem("pref-fontsize")
pf && InputSetEnable(pf)
var mnpf = localStorage.getItem("pref-monofontsize")
mnpf && MonoSetEnable(mnpf)
/* SelectCheckSync() */
var fontsize_select_el = document.getElementById("id--fontsize-selectelm")
if (fontsize_select_el) {
	fontsize_select_el.value = localStorage.getItem("pref-fontsize-selectelm")
}
var monofontsize_select_el = document.getElementById("id--monofontsize-selectelm")
if (monofontsize_select_el) {
	monofontsize_select_el.value = localStorage.getItem("pref-monofontsize-selectelm")
}
}
})()
/* @license-end */
