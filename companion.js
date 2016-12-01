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

var init = function () {
    showJavascriptOnlyElements()
    setVariant(0)
    littleIntroDance()
}

function sleep (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

var littleIntroDance = function () {
    setTimeout(switcher, 1000)
    setTimeout(switcher, 3000)
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
}

var setVariant = function (variant) {
    var style_tag = document.getElementsByTagName("style")
    var button = document.getElementById("switcher-button")
    if (0 === variant)
    {
        button.innerHTML = "Wechsel zur Nachtansicht"
        document.getElementById('css2').href = 'empty.css'
    }
    else if (1 === variant) {
        button.innerHTML = "Wechsel zur Tagesansicht"
        document.getElementById('css2').href = 'dark.css'
    }
    else { alert ("There is a serious disturbance in this program.") }
}
