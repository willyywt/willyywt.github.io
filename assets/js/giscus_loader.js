---
sitemap: false
---
/* @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat License */
if (!gcs_missing) {
  var ft = document.querySelector('footer')
  var gs = document.createElement('script');
  gs.setAttribute("src", "{{ site.giscus.clientjs_url }}")
  gs.setAttribute("data-repo", "{{ site.giscus.repo }}")
  gs.setAttribute("data-repo-id", "{{ site.giscus.repo_id }}")
  gs.setAttribute("data-category", "{{ site.giscus.category }}")
  gs.setAttribute("data-category-id", "{{ site.giscus.category_id }}")
  gs.setAttribute("data-mapping", "{{ site.giscus.mapping }}")
  gs.setAttribute("data-strict", "{{ site.giscus.strict }}")
  gs.setAttribute("data-reactions-enabled", {{ site.giscus.reactions_enabled }})
  gs.setAttribute("data-emit-metadata", "{{ site.giscus.emit_metadata }}")
  gs.setAttribute("data-input-position", "{{ site.giscus.input_position }}")
  gs.setAttribute("crossorigin", "anonymous")
  gs.setAttribute("async", true)
  gs.setAttribute("data-theme", gcs_theme())
  gs.setAttribute("data-lang", "{{ page.lang | default: site.lang | default: "en" }}")
  ft.appendChild(gs)
} else {
    var gcs = document.querySelector('.giscus')
    var warnel = NoteEl("error", "Comments not loaded, because your browser doesn't support: " + gcs_missing)
    gcs.appendChild(warnel)
}
/* @license-end */
