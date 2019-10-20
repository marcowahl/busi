// ==UserScript==
// @name     yt2invidious
// @version  1
// @include *youtube.com*
// @grant    none
// @author   Marco Wahl
// @namespace      https://gitlab.com/marcowahl
// ==/UserScript==

// (C) GPL v3 or later version

// functionality:
// - add a button on a youtube page to
// - try to switch from youtube.com to respective invidio.us.

invidio_url = function () {
    var this_url = window.location.href
    var index_of_watch = this_url.indexOf("watch")
    var watch_spec = this_url.slice(index_of_watch)
    var index_of_ampersand = watch_spec.indexOf("&")
    if (-1 < index_of_ampersand)
        watch_spec = watch_spec.slice(0, index_of_ampersand)
    return "https://invidio.us/"+watch_spec
}

var butt = document.createElement("input")
butt.type = "button"
butt.value = "invidio.us"
butt.style.left = "0px"
butt.style.top = "0px"
butt.style.position = "fixed"
butt.style.background = "orange"
butt.style.zIndex = 99999
butt.onclick = function () {
    window.location = invidio_url()
}
document.body.appendChild(butt)
