#!/bin/sh
sassc -t compressed common.scss > ../_includes/common.css
sassc -t compressed font.scss > ../_includes/font.css
sassc -t compressed light.scss > ../_includes/light.css
sassc -t compressed dark.scss > ../_includes/dark.css
