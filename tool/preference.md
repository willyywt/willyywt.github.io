---
layout: default
title: "Preferences"
last_modified_at: 2022-06-27
---

## Font
<fieldset>
    <legend>Select font:</legend>
    <div>
      <input type="radio" id="huey" name="drone" value="huey" checked>
      <label for="default">Bitter (Default)</label>
	<p> The default Bitter font, from Google Fonts. </p>
	<code>body { font-family: "Bitter",sans; }</code>
    </div>
    <div>
      <input type="radio" id="dewey" name="drone" value="dewey">
      <label for="system-font-stack">System Font Stack</label>
	<p> A list of brand fonts which comes pre-installed on given platforms. </p>
	<code>body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;}</code>
    </div>
    <div>
      <input type="radio" id="louie" name="drone" value="louie">
      <label for="system-ui">system-ui</label>
	<p> The font for system user interface, using the standard CSS value "system-ui". (Less recommended than the previous option) </p>
	<code>body { font-family: system-ui;}</code>
    </div>
</fieldset>

