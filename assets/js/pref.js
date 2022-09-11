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
function id_str(name, value) {
  return "id--" + name + "-" + value;
}
var selectelm_name = {
  "fontsize": "",
  "monofontsize": ""
}
var textelm_name = {
  "font": "",
  "fontsize": "",
  "monofont": "",
  "monofontsize": ""
}
function Select_Enable_2(name, value) {
  var select_el = document.getElementById(id_str(name, "selectelm"));
  if (!select_el) {
    return
  }
  if (value === "custom") {
    select_el.disabled = false;
  } else {
    select_el.disabled = true;
  }
}
function Text_Enable_2(name, value) {
  var text_el = document.getElementById(id_str(name, "textelm"))
  if (!text_el) {
    return
  }
  if (value == "custom-text") {
    text_el.disabled = false
  } else {
    text_el.disabled = true
  }
}
function input_changed_cb(ev) {
	var value = ev.target.value
	var name = ev.target.name
  console.log(name, value)
  /* PreHook */
  if(name in selectelm_name) {
    Select_Enable_2(name, value)
  }
  if (name in textelm_name) {
    Text_Enable_2(name, value)
  }
  /* Hook */
  Hook(name, value)
  /* PostHook */
  if(PrefDefaults[name] === value || !value) {
		PrefRemove(name)
	} else {
    PrefSet(name, value)
	}
	if (name === "theme" && gcs_missing === "") {
		GCSReload()
	}
}
function text_blur_cb(ev) {
  var value = ev.target.value
	var name = ev.target.name
  console.log(name, value)
  if (!name.endsWith("-textelm")) {
    return 
  }
  PrefSet(name, value)
  var name_trunc = name.substring(0, name.length - "-textelm".length)
  Hook(name_trunc, PrefGet(name_trunc))
}
function SetCb() {
  var radio_el = document.querySelectorAll("#wrapper input[type=radio]");
  var text_el = document.querySelectorAll("#wrapper input[type=text]");
  var select_el = document.querySelectorAll("#wrapper select");
  for (var el_index = 0; el_index < radio_el.length; el_index += 1) {
    var el = radio_el[el_index]
    el.addEventListener('change', input_changed_cb)
  }
  for (var el_index = 0; el_index < text_el.length; el_index += 1) {
    var el = text_el[el_index]
    el.addEventListener('blur', text_blur_cb)
  }
  for (var el_index = 0; el_index < select_el.length; el_index += 1) {
    var el = select_el[el_index]
    el.addEventListener('change', input_changed_cb)
  }
}
function Radio() {
  var radio_names = {
    "font": "",
    "fontsize": "",
    "monofont": "",
    "monofontsize": "",
    "theme": ""
  }
  for (n in radio_names) {
    var value = PrefGet(n)
    if (value) {
      var input_el = document.getElementById(id_str(n, value))
      if (input_el) {
        input_el.checked = true
      }
    }
  }
}
function Select_Enable() {
  for (n in selectelm_name) {
    Select_Enable_2(n, PrefGet(n))
  }
}
function Text_Enable() {
  for (n in textelm_name) {
    Text_Enable_2(n, PrefGet(n))
  }
}
function Select_Value() {
  for (n in selectelm_name) {
    var select_el = document.getElementById(id_str(n, "selectelm"))
    if (select_el) {
      select_el.value = PrefGet(n + "-selectelm")
    }
  }
}
function Text_Value() {
  for (n in textelm_name) {
    var text_el = document.getElementById(id_str(n, "textelm"))
    if (text_el) {
      text_el.value = PrefGet(n + "-textelm")
    }
  }
}
SetCb()
Radio()
Select_Enable()
Text_Enable()
Select_Value()
Text_Value()
}
})()
/* @license-end */
