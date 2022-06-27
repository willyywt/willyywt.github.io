---
layout: default
title: "Preferences"
last_modified_at: 2022-06-27
---

# Preferences
These are some preference settings that you can tweak for this website. **Requires Javascript and Cookies to work.**

## Font
<fieldset>
    <legend>Select font:</legend>
    <div>
      <input type="radio" id="pref-font-default" name="name-pref-font" value="pref-font-default" checked>
      <label for="pref-font-default">Bitter (Default)</label>
	<p> The default Bitter font, from Google Fonts. </p>
	<code>body { line-height: 1.8; font-family: "Bitter",sans; }</code>
    </div>
    <div>
      <input type="radio" id="pref-font-brand" name="name-pref-font" value="pref-font-brand">
      <label for="pref-font-brand">System Font Stack</label>
	<p> Brand font that comes pre-installed on the platform. (MacOS, iOS, Windows, Android, ChromeOS, Freedesktop/Linux(KDE, GNOME(Ubuntu), GNOME(vanilla))) </p>
	<code>body { line-height: 1.5; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;}</code>
    </div>
    <div>
      <input type="radio" id="pref-font-system-ui" name="name-pref-font" value="pref-font-system-ui">
      <label for="pref-font-system-ui">system-ui</label>
	<p> The font for system user interface, using the standard CSS value "system-ui". (Useful when your system UI use non-generic typographic traditions.) </p>
	<code>body { line-height: 1.5; font-family: system-ui;}</code>
    </div>
</fieldset>

## Theme
<fieldset>
    <legend>Select theme:</legend>
    <div>
      <input type="radio" id="pref-theme-default" name="name-pref-theme" value="pref-theme-default" checked>
      <label for="pref-theme-default">Follow system (Default)</label>
	<p> Follow system theme variant. <strong>Dark variant autodetection only supported on modern browsers, see quirks at</strong><a href="/article/theme.html#dark-mode">/article/theme.html#dark-mode</a></p>
    </div>
    <div>
      <input type="radio" id="pref-theme-light" name="name-pref-theme" value="pref-theme-light">
      <label for="pref-theme-light">Light</label>
	<p> Light theme. </p>
	<code>&lt;link id="maincss" rel="stylesheet" type="text/css" href="/assets/css/main.css" media="all"&gt;</code>
    </div>
    <div>
      <input type="radio" id="pref-theme-dark" name="name-pref-theme" value="pref-theme-dark">
      <label for="pref-theme-dark">Dark</label>
	<p> Dark theme. </p>
	<code>&lt;link id="maincss" rel="stylesheet" type="text/css" href="/assets/css/main-dark.css" media="all"&gt;</code>
    </div>
</fieldset>
