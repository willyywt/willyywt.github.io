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
if (!document.getElementById(cssId))
{
   var head  = document.getElementsByTagName('head')[0];
   var link  = document.createElement('link');
   link.id   = cssId;
   link.rel  = 'stylesheet';
   link.type = 'text/css';
   link.href = '/assets/css/main.css';
   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
     link.href = '/assets/css/main-dark.css';
   }
   link.media = 'all';
   head.appendChild(link);
   var link2  = document.createElement('link');
   link2.id   = cssId + 'show';
   link2.rel  = 'stylesheet';
   link2.type = 'text/css';
   link2.href = '/assets/css/unhide.css';
   link2.media = 'all';
   head.appendChild(link2);
}
