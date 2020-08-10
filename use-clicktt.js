// ==UserScript==
// @name         use click-tt
// @namespace    https://openuserjs.org/users/5he1d0r
// @copyright    2020, 5he1d0r (https://openuserjs.org/users/5he1d0r)
// @version      3.0.1
// @license      MIT
// @author       5he1d0r
// @match        https://*.click-tt.de/*
// @match        https://*.bttv.de/*
// @match        https://*.httv.de/*
// @grant        none
// @run-at       document-end
// @updateURL    https://openuserjs.org/meta/5he1d0r/use_click-tt.meta.js
// @description  avoid the usage of mytischtennis.de by replacing there links with the click-tt links.
//               This change gives the opportunity of the one-tab-only usage and much easier navigation.
// ==/UserScript==

// ==OpenUserJS==
// @author      5he1d0r
// ==/OpenUserJS==

const isClickTT = () => window.location.pathname.includes('leaguePage');

const isBTTV = () => window.location.pathname.includes('ligen');

const isHTTV = () => window.location.pathname.includes('mannschaftswettbewerbe');

const isValid = () => isClickTT() || isBTTV() || isHTTV();

const needsReplacement = (link) =>
        link.includes('mytischtennis') &&
        link.includes('gruppe') &&
        link.includes('tabelle');

function regularReplacement(link){
    var target = window.location.hostname.split('.')[0];
    var championship = window.location.search.split('?')[1];
    if (championship.includes('DTTB')){
        championship = 'championship=' + link.href.split('/')[4].split('%20').join('+').split('-W').join('w') + '+' + link.href.split('/')[5].split('-').join('%2F');
    }
    var group = 'group=' + link.href.split('/')[9];

    link.removeAttribute('target');
    link.setAttribute('href', `${window.location.origin}${window.location.pathname.split('leaguePage').join('groupPage')}?${championship}&${group}`);
}

function BTTVReplacement(link){
    var activeTab = document
        .getElementById('championship')
        .getElementsByClassName('nav-tabs-nowrap')[0]
        .getElementsByClassName('active')[0]
        .innerText;
    var championship = 'championship=';
    switch(document.getElementsByTagName('h1')[0].innerHTML){
        case('Bundesligen'):
            championship += 'DTTB+';
            break;
        case('Regional- und Oberligen Süd'):
            championship += 'RL-OL+Süd+';
            activeTab = activeTab.split(' ')[1];
            break;
        case('Verbandsligen'):
            championship += 'V000+';
            break;
        case('Unterfranken-West'):
            championship += 'B001+';
            break;
        case('Unterfranken-Nord'):
            championship += 'B002+';
            break;
        case('Unterfranken-Süd'):
            championship += 'B003+';
            break;
        case('Mittelfranken-Süd'):
            championship += 'B004+';
            break;
        case('Oberfranken-West'):
            championship += 'B005+';
            break;
        case('Oberfranken-Ost'):
            championship += 'B006+';
            break;
        case('Mittelfranken-Nord'):
            championship += 'B007+';
            break;
        case('Oberpfalz-Nord'):
            championship += 'B008+';
            break;
        case('Schwaben-Nord'):
            championship += 'B009+';
            break;
        case('Schwaben-Süd'):
            championship += 'B010+';
            break;
        case('Oberbayern-Mitte'):
            championship += 'B011+';
            break;
        case('Oberbayern-Süd'):
            championship += 'B012+';
            break;
        case('Oberpfalz-Süd'):
            championship += 'B013+';
            break;
        case('Oberbayern-Nord'):
            championship += 'B014+';
            break;
        case('Niederbayern-Ost'):
            championship += 'B015+';
            break;
        case('Oberbayern-Ost'):
            championship += 'B016+';
            break;
    }
    championship += activeTab.split('/').join('%2F');
    var group = 'group=' + link.href.split('/')[9];

    link.removeAttribute('target');
    link.setAttribute('href', `https://bttv.click-tt.de/cgi-bin/WebObjects/nuLigaTTDE.woa/wa/groupPage?${championship}&${group}`);
}

function HTTVReplacement(link){
    var championship = 'championship=';
    switch(document.getElementsByTagName('h1')[0].innerHTML){
        case('Hessen- und Verbandsligen'):
            championship += 'HTTV+';
            break;
        case('Bezirk Nord'):
            championship += 'B1+';
            break;
        case('Hersfeld-Rotenburg'):
            championship += 'K11+';
            break;
        case('Kassel'):
            championship += 'K12+';
            break;
        case('Marburg-Biedenkopf'):
            championship += 'K13+';
            break;
        case('Schwalm-Eder'):
            championship += 'K14+';
            break;
        case('Waldeck-Frankenburg'):
            championship += 'K15+';
            break;
        case('Werra-Meißner'):
            championship += 'K16+';
            break;
        case('Bezirk Mitte'):
            championship += 'B2+';
            break;
        case('Fulda'):
            championship += 'K21+';
            break;
        case('Gießen'):
            championship += 'K22+';
            break;
        case('Main-Kinzig'):
            championship += 'K23+';
            break;
        case('Vogelsberg'):
            championship += 'K24+';
            break;
        case('Wetterau'):
            championship += 'K25+';
            break;
        case('Bezirk West'):
            championship += 'B3+';
            break;
        case('Hochtaunus'):
            championship += 'K31+';
            break;
        case('Lahn-Dill'):
            championship += 'K32+';
            break;
        case('Limburg-Weilburg'):
            championship += 'K33+';
            break;
        case('Main-Taunus'):
            championship += 'K34+';
            break;
        case('Reingau-Taunus'):
            championship += 'K35+';
            break;
        case('Wiesbaden'):
            championship += 'K36+';
            break;
        case('Bezirk Süd'):
            championship += 'B4+';
            break;
        case('Bergstraße'):
            championship += 'K41+';
            break;
        case('Darmstadt-Dieburg'):
            championship += 'K42+';
            break;
        case('Frankfurt'):
            championship += 'K43+';
            break;
        case('Groß-Genau'):
            championship += 'K44+';
            break;
        case('Odenwald'):
            championship += 'K45+';
            break;
        case('Offenbach'):
            championship += 'K46+';
            break;
    }
    championship += document
        .getElementById('championship')
        .getElementsByClassName('nav-tabs-nowrap')[0]
        .getElementsByClassName('active')[0]
        .innerText
        .split(' ')[2]
        .split('/').join('%2F');

    var group = 'group=' + link.href.split('/')[9];

    link.removeAttribute('target');
    link.setAttribute('href', `https://httv.click-tt.de/cgi-bin/WebObjects/nuLigaTTDE.woa/wa/groupPage?${championship}&${group}`);
}

(function() {
    if(isValid()){
        for(var link of document.getElementsByTagName('a')){
            if(needsReplacement(link.href)){
                if(isClickTT()){
                    regularReplacement(link);
                }
                if(isBTTV()){
                    BTTVReplacement(link);
                }
                if(isHTTV()){
                    HTTVReplacement(link);
                }
            }
        }
    }
})();
