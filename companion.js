// Switch css styles
// Copyright (C) 2016  Marco Wahl
// marcowahlsoft@gmail.com

// This program is free software: you can redistribute it and/or
// modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see
// <http://www.gnu.org/licenses/>.

'use strict'

var variant = 0
var blinksPerformed = 0
var maxBlinks = 2
var blinkDuration = 1000 // ms

var init = function () {
    showJavascriptOnlyElements()
    performInitialBlinks()
}

var performInitialBlinks = function () {
    if ( blinksPerformed < maxBlinks ) {
        switcher();
        setButtonTextVariant(variant)
        blinksPerformed += 1
        setTimeout(performInitialBlinks, blinkDuration)
    }
}

var showJavascriptOnlyElements = function() {
    var elements = document.getElementsByClassName("javascriptonly")
    for (var ii = 0; ii < elements.length; ii++) {
        elements[ii].style.display = "block"
    }
}

var switcher = function () {
    variant += 1
    variant %= 2
    setVariant(variant)
    setButtonTextVariant(variant)
}

var setButtonTextVariant = function(variant) {
    var button = document.getElementById("switcher-button")
    if (0 === variant)
        button.innerHTML = "Wechsel zur Nachtansicht"
    else if (1 === variant)
        button.innerHTML = "Wechsel zur Tagesansicht"
    else    {
        alert ("internal logic error")
    }
    }

var setVariant = function (variant) {
    var style_tag = document.getElementsByTagName("style")
    if (0 === variant)
    {
        document.getElementById('css2').href = 'empty.css'
    }
    else if (1 === variant) {
        document.getElementById('css2').href = 'dark.css'
    }
    else { alert ("There is a serious disturbance in this program.") }
}
