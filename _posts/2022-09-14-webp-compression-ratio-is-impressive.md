---
layout: post
title: "Webp compression ratio is impressive"
last_modified_at: 2022-09-15
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
I recently added webp format for this blog's images, and the reduction in file size is impressive. I use webp lossless compression for PNG images which has reduced size for more than 50%. For JPG images I opted for lossy compression, which squeezed a 1.4MB .`jpg` file to amazingly small 76KB `.webp` file, while still being visually identical to the original image!

## Add multiple file format support
Use `<picture>` and `<source>` for such purpose. Example:

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="A description of the image." width="1920" height="1080">
</picture>
```

## Convertion program
### CLI
I use `img2webp` for webp convertion. It defaults to lossless compression but you can also use `-lossy` to use lossy compression. (You probably don't want to use lossless compression for JPEG since the resulting webp image may grow size instead.) On linux distributions it is packaged as name `webp` or `libwebp-tools` or `libwebp`. You can also download prebuilt binaries from [https://developers.google.com/speed/webp/download](https://developers.google.com/speed/webp/download).

### Website
The [squoosh](https://squoosh.app/) web page can do compresson between image formats. The source code is licensed under Apache License v2.

## JPEG and PNG lossless compress
If you do not wish to use webp for any reason, try JPEG and PNG lossless compress CLI tools `jpegoptim` and `optipng`.

On Freedesktop/Linux there's a simple GUI wrapper [Image-Optimizer](https://github.com/GijsGoudzwaard/Image-Optimizer) that does the same job.
