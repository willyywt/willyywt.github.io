---
layout: page
title: Introducing cryptography tools - age and minisign
---
## Age and minisign
I am now migrating to new cryptography tools and stop using the broken PGP.

* For encryption: [age](https://github.com/FiloSottile/age) (or use 7-zip when using file archive)
* For signing: [minisign](https://github.com/jedisct1/minisign)

## Priciples for cryptography design
(TODO: these principles need to be heavily elaborated and refer to lots of available references)
* Compatibility is evil: Compatibility always compromises cryptography security.
* "Open Standard" is the problem itself. Programs need to work in narrower cases first then expand to general cases, especially for programs in alpha stages
* Only use well-known cryptography algorithms
* Low-level details must not be configurable by users

## Minisign
My minisign public key: **RWSVADkxkRruodtZOCHC0ym+ANlFDgx9UdCnseqWXzO0SvZgF+IP6kl+**

Download the public key file (the same key as the above string): [minisign public key](minisign-1.pub)

As usual, real-world folks can challenge this key's authority by requiring me to sign arbitary files.

### Git archive signing
This blog's [git repository](https://github.com/willyywt/willyywt.github.io) will from now have tags occasionally. I will use `git archive --format=zip` to create an archive for each tag, upload the archive as a github release, and sign the git archive file using minisign.

[Github releases](https://github.com/willyywt/willyywt.github.io/releases/)

### Minisign Usage
Minisign is bascially few hundred line wrappers for [libsodium](https://libsodium.org/). It rans on all major compilers and operating systems.

[Minisign](https://jedisct1.github.io/minisign/)