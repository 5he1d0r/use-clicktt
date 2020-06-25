// ==UserScript==
// @name         use click-tt
// @namespace    https://openuserjs.org/users/5he1d0r
// @copyright    2020, 5he1d0r (https://openuserjs.org/users/5he1d0r)
// @version      2.0.2
// @license      MIT
// @description  avoid the usage of mytischtennis.de
// @author       5he1d0r
// @match        https://www.mytischtennis.de/*
// @grant        none
// @run-at       document-end
// @updateURL    https://openuserjs.org/meta/5he1d0r/use_click-tt.meta.js
// ==/UserScript==

// ==OpenUserJS==
// @author      5he1d0r
// ==/OpenUserJS==

const isValid = function(pathname) {
    return pathname.includes('gruppe') &&
        pathname.includes('tabelle');
};

(function() {
    'use strict';

    if(isValid(window.location.pathname)){
        var aTag = document.getElementsByClassName('breadcrumb')[0].getElementsByTagName('a')[2];

        var championship = 'championship=' + aTag.title.split('(')[1].split(')')[0].split(' ').join('+').split('-W').join('w').split('/').join('%2F');

        var group = 'group=' + window.location.pathname.split('/')[7];

        location.replace('https://wttv.click-tt.de/cgi-bin/WebObjects/nuLigaTTDE.woa/wa/groupPage?' + championship + '&' + group);
    }
})();
