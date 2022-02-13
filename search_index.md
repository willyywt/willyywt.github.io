---
layout: search_index
---
[{% if site.search_index %}{% for post in site.posts %}{
	"title": {{ post.title | jsonify }},
	"category": {{ post.category | jsonify }},
	"link": {{ post.url | jsonify }},
	"date": {{ post.date | jsonify }},
	"excerpt": {{ post.excerpt | strip_html | jsonify }},
	"content": {{ post.content | strip_html | jsonify }}
}{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}]
