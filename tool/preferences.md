---
layout: default
title: "Preferences"
last_modified_at: 2022-07-08
customHeadHTML: '<script>var mel = document.querySelector("main");var mel_h1 = document.querySelector("main h1");if(!Modernizr.localstorage){var errlocalel = NoteEl("error", "Preferences are unavaliable because your browser does not support localSstorage.");mel.insertBefore(errlocalel, mel_h1.nextSibling)}if(!Modernizr.classlist){var mel_th = document.getElementById("theme");var errclst = NoteEl("error", "Theme cannot be changed because your browser does not support classList.");mel.insertBefore(errclst, mel_th.nextSibling)}</script><script src="../assets/js/pref.js"></script>'
---

# Preferences
<noscript id="noscript-noprefbanner"> Preferences requires JavaScript to work. </noscript>
These are some preference settings that you can tweak for this website.

## Font
<div class="note warning"><b>Warning: </b>
Font changes cannot be applied to comments due to cross-site scripting restrictions in browsers.
</div>
### Sans-Serif Font
<fieldset>
    <legend>Select sans-serif font family:</legend>
    <div>
      <input type="radio" id="pref-font-default" name="name-pref-font" value="pref-font-default" checked>
      <label for="pref-font-default">Bitter (Default)</label>
	<p> The default Bitter font, from Google Fonts. </p>
    </div>
    <div>
      <input type="radio" id="pref-font-brand" name="name-pref-font" value="pref-font-brand">
      <label for="pref-font-brand">System Font Stack</label>
	<p> Brand font that comes pre-installed on the platform. (MacOS, iOS, Windows, Android, ChromeOS, Freedesktop/Linux(KDE, GNOME(Ubuntu), GNOME(vanilla))) </p>
    </div>
    <div>
      <input type="radio" id="pref-font-system-ui" name="name-pref-font" value="pref-font-system-ui">
      <label for="pref-font-system-ui">system-ui</label>
	<p> The font for system user interface, using the standard CSS value "system-ui". (Useful when your system UI use non-generic typographic traditions.) </p>
    </div>
</fieldset>
<fieldset>
<legend>Select base font size:</legend>
<div>
	<input type="radio" id="pref-fontsize-default" name="name-pref-fontsize" value="pref-fontsize-default" checked>
	<label for="pref-fontsize-default">17px (Default)</label>
</div>
<div>
	<input type="radio" id="pref-fontsize-custom" name="name-pref-fontsize" value="pref-fontsize-custom">
	<label for="pref-fontsize-custom">Custom:</label>
	<label for="pref-fontsize-selectelm">Select font size...</label>
	<select name="name-pref-fontsize-selectelm" id="pref-fontsize-selectelm" disabled>
		<option value="default">Default</option>
		<option value="9px">9px</option>
		<option value="10px">10px</option>
		<option value="11px">11px</option>
		<option value="12px">12px</option>
		<option value="13px">13px</option>
		<option value="14px">14px</option>
		<option value="15px">15px</option>
		<option value="16px">16px</option>
		<option value="17px">17px</option>
		<option value="18px">18px</option>
		<option value="19px">19px</option>
		<option value="20px">20px</option>
		<option value="21px">21px</option>
		<option value="22px">22px</option>
		<option value="23px">23px</option>
		<option value="24px">24px</option>
		<option value="26px">26px</option>
		<option value="28px">28px</option>
		<option value="30px">30px</option>
		<option value="32px">32px</option>
		<option value="34px">34px</option>
		<option value="36px">36px</option>
		<option value="40px">40px</option>
		<option value="44px">44px</option>
		<option value="48px">48px</option>
		<option value="56px">56px</option>
		<option value="64px">64px</option>
		<option value="72px">72px</option>
	</select>
</div>
</fieldset>
### Monospace Font
<fieldset>
	<legend>Select monospace font family:</legend>
	<div>
		<input type="radio" id="pref-monofont-default" name="name-pref-monofont" value="pref-monofont-default" checked>
		<label for="pref-monofont-default">Source Code Pro (Default)</label>
		<p> The Source Code Pro font, from Adobe. </p>
	</div>
	<div>
		<input type="radio" id="pref-monofont-brand" name="name-pref-monofont" value="pref-monofont-brand">
		<label for="pref-monofont-brand">System Font Stack</label>
		<p> Brand font that comes pre-installed on the platform. (MacOS, Windows, Freedesktop/Linux, ChromeOS) </p>
	</div>
	<div>
		<input type="radio" id="pref-monofont-fallback" name="name-pref-monofont" value="pref-monofont-fallback">
		<label for="pref-monofont-fallback">Fallback Monospace font</label>
		<p> Fallback monospace font installed on the system.</p>
	</div>
</fieldset>
<fieldset>
	<legend>Select monospace font size:</legend>
	<div>
		<input type="radio" id="pref-monofontsize-default" name="name-pref-monofontsize" value="pref-monofontsize-default" checked>
		<label for="pref-monofontsize-default">0.9rem (&gt;=850px), 0.8rem (&lt;850px) (Default)</label>
	</div>
	<div>
		<input type="radio" id="pref-monofontsize-custom" name="name-pref-monofontsize" value="pref-monofontsize-custom">
		<label for="pref-monofontsize-custom">Custom:</label>
		<label for="pref-monofontsize-selectelm">Select font size...</label>
		<select name="name-pref-monofontsize-selectelm" id="pref-monofontsize-selectelm" disabled>
			<option value="default">Default</option>
			<option value="9px">9px</option>
			<option value="10px">10px</option>
			<option value="11px">11px</option>
			<option value="12px">12px</option>
			<option value="13px">13px</option>
			<option value="14px">14px</option>
			<option value="15px">15px</option>
			<option value="16px">16px</option>
			<option value="17px">17px</option>
			<option value="18px">18px</option>
			<option value="19px">19px</option>
			<option value="20px">20px</option>
			<option value="21px">21px</option>
			<option value="22px">22px</option>
			<option value="23px">23px</option>
			<option value="24px">24px</option>
			<option value="26px">26px</option>
			<option value="28px">28px</option>
			<option value="30px">30px</option>
			<option value="32px">32px</option>
			<option value="34px">34px</option>
			<option value="36px">36px</option>
			<option value="40px">40px</option>
			<option value="44px">44px</option>
			<option value="48px">48px</option>
			<option value="56px">56px</option>
			<option value="64px">64px</option>
			<option value="72px">72px</option>
		</select>
	</div>
</fieldset>

## Theme
<fieldset>
    <legend>Select theme:</legend>
    <div>
      <input type="radio" id="pref-theme-default" name="name-pref-theme" value="pref-theme-default" checked>
      <label for="pref-theme-default">Follow system (Default)</label>
	<p> Follow system theme variant. <strong>Dark variant autodetection only supported on modern browsers, see quirks at</strong><a href="../article/theme.html#dark-mode">../article/theme.html#dark-mode</a></p>
    </div>
    <div>
      <input type="radio" id="pref-theme-light" name="name-pref-theme" value="pref-theme-light">
      <label for="pref-theme-light">Light</label>
	<p> Light theme. </p>
    </div>
    <div>
      <input type="radio" id="pref-theme-dark" name="name-pref-theme" value="pref-theme-dark">
      <label for="pref-theme-dark">Dark</label>
	<p> Dark theme. </p>
    </div>
</fieldset>
