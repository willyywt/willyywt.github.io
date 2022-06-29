var cookie_json = {}
var constvals = {
  "cssdark": '/assets/css/main-dark.css',
  "csslight": '/assets/css/main.css',
  "cssunhide": '/assets/css/unhide.css'
}
var LegendName_arr = ["name-pref-font", "name-pref-theme"]
var cssId = 'maincss';
var csshookId = 'hookcss';
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
function Cookie2Json() {
  var index_start = 0;
  while (index_start < document.cookie.length) {
    var parse_result = CookieParsePair(index_start)
    if (parse_result.key.length == 0 || parse_result.index <= index_start) {
      return
    }
    index_start = parse_result.index
    cookie_json[parse_result.key] = decodeURIComponent(parse_result.value)
  }
}
function Json2Cookie() {
  var cookie_arr = []
  for (key in cookie_json) {
    var value = encodeURIComponent(cookie_json[key])
    var cookie_str_1 = key.concat("=", value, "; ")
    cookie_arr.push(cookie_str_1)
  }
  document.cookie = Array.prototype.concat(cookie_arr)
}
function StyleInsertLink(conf) {
   var head  = document.getElementsByTagName('head')[0]
   var link  = document.createElement('link')
   link.id   = conf.id
   link.rel  = conf.rel || 'stylesheet'
   link.type = conf.type || 'text/css'
   if(conf.href) link.href = conf.href
   link.textContent = conf.textContent || ''
   link.media = conf.media || 'all'
   head.appendChild(link);
}
function StyleInsertStyle(conf) {
   var head  = document.getElementsByTagName('head')[0]
   var style = document.createElement('style')
   style.id = conf.id
   style.textContent = conf.textContent || ''
   head.appendChild(style);
}
function CookieLevelHook(name, value) {
  var CookieLevelHookCb_dict = {
    "name-pref-font": PrefFontCb,
    "name-pref-theme": PrefThemeCb,
  }
  if (name in CookieLevelHookCb_dict) {
    var cbfunc = CookieLevelHookCb_dict[name]
    cbfunc(value)
  }
}
function CookieLevelHook_doall() {
  for (name of LegendName_arr) {
    var value = cookie_json[name];
    CookieLevelHook(name, value)
  }
}
function PrefFontCb(value) {
  var FontFamily_dict = {
    "pref-font-default": {"lineHeight": "", "fontFamily": ""},
    "pref-font-brand": {"lineHeight": "1.5", "fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif"},
    "pref-font-system-ui": {"lineHeight": "1.5", "fontFamily": "system-ui, sans"}
  }
  var csshook_el = document.getElementById(csshookId)
  var css_str = "html body{"
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
  }
  csshook_el.textContent = css_str
}
function PrefThemeCb(value) {
  var main_el = document.getElementById(cssId)
  var show_el = document.getElementById(cssId + 'show')
  if (!main_el || !show_el) {
    return
  }
  var is_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  show_el.href = ""
  if (value === "pref-theme-default") {
    main_el.href = is_dark ? constvals.cssdark : constvals.csslight
  } else if (value === "pref-theme-dark") {
    main_el.href = constvals.cssdark
  } else if (value == "pref-theme-light") {
    main_el.href = constvals.csslight
  }
  show_el.href = constvals.cssunhide
}
if (!document.getElementById(cssId))
{
   var is_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
   StyleInsertLink({
     "id": cssId,
     "href": is_dark ? constvals.cssdark : constvals.csslight
   })
   StyleInsertLink({
     "id": cssId + 'show',
     "href": constvals.cssunhide
   })
}
if (!document.getElementById(csshookId))
{
   StyleInsertStyle({
     "id": csshookId
   })
}
Cookie2Json()
CookieLevelHook_doall()
