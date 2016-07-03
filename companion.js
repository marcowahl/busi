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

var variant = 0

var switcher = function () {
    variant += 1
    if (2 === variant) {
        variant = 0
    }
    setVariant(variant)
}

var setVariant = function (variant) {
    var style_tag = document.getElementsByTagName("style")
    var button = document.getElementById("switcher-button");
    if (0 === variant)
    {
        button.innerHTML = "Wechsel zur Nachtansicht"
        style_tag[0].innerHTML = lightCSS()
    }
    else if (1 === variant) {
        button.innerHTML = "Wechsel zur Tagesansicht"
        style_tag[0].innerHTML = darkCSS()
    }
    else { alert ("There is a disturbance in this program."); }

}

function lightCSS() {
    return `body {
    font-family: Profont, monospace, Courier, monospace;
    margin: 0;
    padding: 1em;
    background-image: url('./internet-transparent.jpg');
    background-attachment: fixed;
}

#main-statement {
    text-align:left;
}

ul {
    list-style-type: none;
}

.relevant-text {
    background-color: #fff;
    opacity: 0.8;
}

.blurred {
    font-size: 70%;
}

div > ul {
    padding-bottom: 10px;
}
`
}

function darkCSS() {
    return lightCSS() +
    `
    body {
filter: invert(100%);
background-image: none;
background-color: black;
}
`
}

// (function () {setVariant(0)})()
