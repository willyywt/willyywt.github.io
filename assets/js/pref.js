/* @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat License */
(function(){
  function PrefSet(name, value) {
    return localStorage.setItem("pref-" + name, value)
  }
  function PrefRemove(name, value) {
    return localStorage.removeItem("pref-" + name, value)
  }
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
/* PrefSetCb() */
pref_input_el_arr = document.querySelectorAll("#wrapper input");
pref_select_el_arr = document.querySelectorAll("#wrapper select");
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
  /* PreHook */
	var val = ev.target.value
	var name = ev.target.name
	console.log(name, val)
	if(name === "fontsize") {
		InputSetEnable(val)
	} else if (name == "monofontsize") {
		MonoSetEnable(val)
	}
  /* Hook */
  Hook(name, val)
  /* PostHook */
  if(PrefDefaults[name] === val || !val) {
		PrefRemove(name)
	} else {
    PrefSet(name, val)
	}
	if (name === "theme" && gcs_missing === "") {
		GCSReload()
	}
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
for (n in PrefDefaults) {
	var value = PrefGet(n)
	if (value) {
		var input_el = document.getElementById("id--" + n + "-" + value)
		if (input_el) {
			input_el.checked = true
		}
	}
}
/* InputCheckSync() */
var pf = PrefGet("fontsize")
pf && InputSetEnable(pf)
var mnpf = PrefGet("monofontsize")
mnpf && MonoSetEnable(mnpf)
/* SelectCheckSync() */
var fontsize_select_el = document.getElementById("id--fontsize-selectelm")
if (fontsize_select_el) {
	fontsize_select_el.value = PrefGet("fontsize-selectelm")
}
var monofontsize_select_el = document.getElementById("id--monofontsize-selectelm")
if (monofontsize_select_el) {
	monofontsize_select_el.value = PrefGet("monofontsize-selectelm")
}
}
})()
/* @license-end */
