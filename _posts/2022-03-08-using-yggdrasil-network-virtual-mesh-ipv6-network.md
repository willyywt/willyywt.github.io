---
layout: post
title: "Yggdrasil network: a virtual mesh ipv6 network with tree-like routing"
categories: admin
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
[Yggdrasil](http://drasil-network.github.io/) is a easy way to connect different devices together. Each device has IPV6 address generated from their cryptographic keys, connect to known nodes on their configuration file, and use a tree-like routing scheme. Yggdrasil is also a superior TCP-over-TCP implementation [suppressing traditional OpenVPN and SSH forwarding](https://yggdrasil-network.github.io/2018/07/15/remote-access.html). Currently I use yggdrasil with several network applications, most notabaly [KDEConnect](https://kdeconnect.kde.org/) and [Syncthing](https://syncthing.net/).

## Yggdrasil Network
The yggdrasil network is a virtual, layered mesh IPV6 network with a special routing scheme for mesh network.
Yggdrasil use virtual IPV6 address generated from a cryptographic key in a node's configuration file (can be generated by `yggdrasil -genconf`), and this virtual IPV6 address stays with the node running yggdrasil (in contrast to dynamically changing address based on geolocation and autonomous systems). The IPV6 address  comes from a "playground" IP range by the IETF (`0200:7`), so this virtual address doesn't conflict with "real" network routing. Yggdrasil enforce end-to-end encryption between nodes, using the cryptographic keys. Yggdrasil use a tree-like routing scheme based on DHT but uses address independent routing (see [Addressing and Name-Independent Routing](https://yggdrasil-network.github.io/2018/07/28/addressing.html) before v0.4 and [Preparing for Yggdrasil v0.4 #Routing](https://yggdrasil-network.github.io/2021/06/19/preparing-for-v0-4.html#routing) for routing scheme update after v0.4).

Yggdrasil does not connect to other nodes for you: yggdrasil is not something like bittorrent or similar. You must manually configure the nodes ("static peers") that you want to connect to at the Internet (for outcoming connection) and (possibly) listen at a port to accept incoming connection (your IP address and the port must be open to accept incoming connection). Yggdrasil only use the "real" internet connection you configured and does not do NAT traversal or peer discovery itself (though yggdrasil does connect to peers in the local network, but not over the whole Internet).

Yggdrasil however is publicly addressable (using the routing scheme discussed above), and yggdrasil makes your devices easily avaliable over the Internet. Once connected to the yggdrasil network, the nodes can accept outcoming and incoming connection using the yggdrasil IPV6 address, at any port, regardless of whether the node can accept incoming connection in "real" IP address, and which port the node opens in "real" IP address (as long as the port used by yggdrasil is not blocked).

Yggdrasil makes accepting connections from a small list of devices trivial: because yggdrasil IPV6 address stays unchanged unless the devices' private key is regenerated, and the IPV6 address is generated from a cryptographic hash of the public key, each node running yggdrasil is authenticated by the private-public key pair on each device,  you can authenticate devices by simply use standard firewall utilities like [firewalld](https://firewalld.org/) to filter connections from known yggdrasil IP addresses. On the "real" Internet IP address is only roughly related to geolocation and unrelated to actual devices at all, making authentication much more complex. (Yggdrasil provides end-to-end encryption at IP protocol level)

Yggdrasil is a superior TCP-over-TCP implementation and also a superior virtual network implementation: even not considering the entire yggdrasil network, you can use yggdrasil as a intranet penetration tool. Once the devices is connected to the yggdrasil network (by connecting to a public peer from yggdrasil project, or to your custom server), you can connect to the devices from anywhere in the yggdrasil network, as if the devices behind NAT have a public IP address and can accept incoming connection. Yggdrasil have performance [suppressing traditional OpenVPN and SSH forwarding](https://yggdrasil-network.github.io/2018/07/15/remote-access.html).

## Use yggdrasil to peer with devices behind NAT
Devices behind NAT can only make outcoming connections but not incoming connections. Yggdrasil cannot change this; a devices must actively establish outcoming connections to connect to the yggdrasil network. So I still need a public yggdrasil node that can accept incoming connections so that device behind NAT can connect to the yggdrasil network through the public yggdrasil node.

Yggdrasil has [public peers](https://publicpeers.neilalexander.dev/) which you can add to the `Peers` configuration section ("static peers"), but I want servers of mine: I bought VPS for this purpose, setup yggdrasil on these VPS, and then on then my laptop and my phone (yggdrasil has an unofficial Android version: [crispa-android](https://github.com/yggdrasil-network/crispa-android)). I set these VPS to be on the first lines of my laptop and my phone's `Peers`. I also added a few peers from the public peers, mostly from japan and the US.

Yggdrasil doesn't automatically sort peers for peering latency and speed; insteal yggdrasil will try the `Peers` from the first line to the last line in the configuration file. As the [Peering](https://yggdrasil-network.github.io/2019/03/25/peering.html) page suggests, you should add fast peers first and add slower peers last. Hopefully, if the internet connection is stable, my laptop and my phone should connect to each other in a shortcut path -- connects to the same VPS, without detouring any further.

After connecting to the yggdrasil network, the device can accept incoming connection from its yggdrasil IPV6  address, using the underlying outcoming Internet connection.

### KDEConnect
KDEConnect can connect over the Internet, but KDEConnect prefers to connect to devices on the local network. But this doesn't work in my case as the campus wifi has AP isolation enabled, so devices simply doesn't connect to each other. For my laptop and my phone to connect I have to make them detour to my VPS on the Internet. (This is suboptimal but I have no control over the campus wifi).

Setting up something like intranet penetration was always pretty painful. Thanks to yggdrasil, no complicated work need to be done; I just add my laptop's yggdrasil IP address to KDEConnect and KDEConnect just works as no AP isolation is present on the yggdrasil network.

### Syncthing
Syncthing has relay servers contributed by volunteers so devices behind NAT can transport data through the relay. But running a syncthing relay server costs lots of bandwidth and is pretty expensive, so there are not many relay servers here; even worse thanks to Internet censorship in China (the Great Firewall) connecting to syncthing relays in Singapore is tens of kilobytes per second. I still have to rely on my private VPS here; I connect my laptop and my phone to the VPS's address and add my laptop's yggdrasil IP address to my phone.

Like KDEConnect, Syncthing works just fine over my laptop's yggdrasil address and my phone's yggdrasil address. Note that there is no need to run a syncthing relay server on the VPS, because yggdrasil address can accept incoming connection and thus my laptop and my phone

## Use yggdrasil to save the hassle of TLS certificate
Buying a domain and applying a TLS certificate isn't hard, but irritating. The biggest problem is that TLS certificates are bound to domain names rather than devices.

A domain name must be resolved to IP addresses publicly available, which doesn't cover devices behind NAT. (Using DDNS for devices which gets public IP address from DHCP is possible but somewhat complicated to do.)  Typically, I must install the TLS certificate on a server and use the server to do intranet penetration using tools like [frp](https://github.com/fatedier/frp). This means end-to-end encryption stop at such server (since TLS connection ends at such server, making the server man-in-the-middle (MITM). TLS certificates are incompatiable with third party intranet penetration services like [natapp](https://natapp.cn/) which use its own domain names, because you cannot use a TLS certificate for a third party domain name. TLS certificate also must be regulary refreshed  (every three month for [Let's Encrypt](https://letsencrypt.org/)); this happens automatically on services like github or glitch but obviously not on your own server.

With yggdrasil these problems disappear, because yggdrasil does end-to-end encryption between devices. You can simply serve plain http services instead of https because these get encrypted by yggdrasil. You need a public server to connect the devices to the yggdrasil network but you don't need any sort of domain name or TLS certificate on it; the server is simply a node where my laptop and my phone connects each other.

Currently I run [qbittorrent](https://www.qbittorrent.org) and [radicale](https://radicale.org) (a CAlDAV and CardDAV server) on a spare laptop running 24-7. I can happily set them to serve plain http thanks to yggdrasil. And also thanks to yggdrasil it's pretty simple to restrict access to them, by having them to listen on ports not publicly exported, and use [firewalld](https://firewalld.org/) to add a zone for my laptop's yggdrasil address which gets access to these ports:
```sh
firewall-cmd --permanent --new-zone known
firewall-cmd --permanent --zone=known --add-source=<laptop yggdrasil address>
firewall-cmd --permanent --zone=known --add-port=1-65535/udp
firewall-cmd --permanent --zone=known --add-port=1-65535/tcp
firewall-cmd --reload
```