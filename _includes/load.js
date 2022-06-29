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
