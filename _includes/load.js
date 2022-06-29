var cookie_json = {}
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
var cssId = 'maincss';
function StyleInsertElement(conf) {
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
if (!document.getElementById(cssId))
{
   var is_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
   StyleInsertElement({
     "id": cssId,
     "href": is_dark ? '/assets/css/main-dark.css' : '/assets/css/main.css'
   })
   StyleInsertElement({
     "id": cssId + 'show',
     "href": '/assets/css/unhide.css'
   })
}
