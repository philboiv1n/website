// *****************************************
// Javascript Library for philboivin.com
// Last updated on December 9, 2020.
// *****************************************

function displayGallery(csvURL, gallery) {
	var data;
 	$.ajax({
    	type: "GET",  
    	url: csvURL,
    	dataType: "text",       
    	success: function(response) {
        
        	data = $.csv.toArrays(response);

        	jQuery(gallery).nanogallery2( {

	        // THUMBNAILS
	        thumbnailWidth: "auto",
	        thumbnailHeight: 300,
	        thumbnailGutterWidth: 10, 
	        thumbnailGutterHeight: 10,
	        thumbnailBorderHorizontal: 0, 
	        thumbnailBorderVertical: 0,
	        thumbnailLabel: { display: false },


	        // LIGHTBOX
	        viewerToolbar: { display: false },
	        viewerTools: {
	        	topLeft:   'label',
	            topRight:  'shareButton, zoomButton, fullscreenButton, closeButton'
          	},
    
          
          	// CONTENT - Will be filled dynamically s
          	items: []

        });

  
        /*
        CSV data structure (Dec. 2020)
        0 - Date
        1 - Name
        2 - Description
        3 - Location
        4 - URL full image
        5 - URL thumbnail

        */

        var instance = $(gallery).nanogallery2('instance');
        var albumID = '0';

          for (var i = 1; i < data.length; i++) {
           
            // add new item to the gallery with meta information 
            var newItem = NGY2Item.New(instance, data[i][1], data[i][2]+' ('+data[i][0]+' - '+data[i][3]+')', i, albumID, 'image', '' );

            // define thumbnail -> image displayed in the gallery
            newItem.thumbSet(data[i][4],0,0); // w,h

            // define URL of the media to display in lightbox
            newItem.setMediaURL(data[i][5], 'img');
          }


		},

	});
}

// jquery.csv.min.js
// A jQuery CSV parser plugin (v.1.0.11)
// https://github.com/typeiii/jquery-csv
RegExp.escape=function(r){return r.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")},function(){"use strict";var p;(p="undefined"!=typeof jQuery&&jQuery?jQuery:{}).csv={defaults:{separator:",",delimiter:'"',headers:!0},hooks:{castToScalar:function(r,e){if(isNaN(r))return r;if(/\./.test(r))return parseFloat(r);var a=parseInt(r);return isNaN(a)?null:a}},parsers:{parse:function(r,e){var a=e.separator,t=e.delimiter;e.state.rowNum||(e.state.rowNum=1),e.state.colNum||(e.state.colNum=1);var o=[],s=[],n=0,i="",l=!1;function u(){if(n=0,i="",e.start&&e.state.rowNum<e.start)return s=[],e.state.rowNum++,void(e.state.colNum=1);if(void 0===e.onParseEntry)o.push(s);else{var r=e.onParseEntry(s,e.state);!1!==r&&o.push(r)}s=[],e.end&&e.state.rowNum>=e.end&&(l=!0),e.state.rowNum++,e.state.colNum=1}function c(){if(void 0===e.onParseValue)s.push(i);else if(e.headers&&1===e.state.rowNum)s.push(i);else{var r=e.onParseValue(i,e.state);!1!==r&&s.push(r)}i="",n=0,e.state.colNum++}var f=RegExp.escape(a),d=RegExp.escape(t),m=/(D|S|\r\n|\n|\r|[^DS\r\n]+)/,p=m.source;return p=(p=p.replace(/S/g,f)).replace(/D/g,d),m=new RegExp(p,"gm"),r.replace(m,function(r){if(!l)switch(n){case 0:if(r===a){i+="",c();break}if(r===t){n=1;break}if(/^(\r\n|\n|\r)$/.test(r)){c(),u();break}i+=r,n=3;break;case 1:if(r===t){n=2;break}i+=r,n=1;break;case 2:if(r===t){i+=r,n=1;break}if(r===a){c();break}if(/^(\r\n|\n|\r)$/.test(r)){c(),u();break}throw Error("CSVDataError: Illegal State [Row:"+e.state.rowNum+"][Col:"+e.state.colNum+"]");case 3:if(r===a){c();break}if(/^(\r\n|\n|\r)$/.test(r)){c(),u();break}if(r===t)throw Error("CSVDataError: Illegal Quote [Row:"+e.state.rowNum+"][Col:"+e.state.colNum+"]");throw Error("CSVDataError: Illegal Data [Row:"+e.state.rowNum+"][Col:"+e.state.colNum+"]");default:throw Error("CSVDataError: Unknown State [Row:"+e.state.rowNum+"][Col:"+e.state.colNum+"]")}}),0!==s.length&&(c(),u()),o},splitLines:function(r,a){if(r){var t=(a=a||{}).separator||p.csv.defaults.separator,o=a.delimiter||p.csv.defaults.delimiter;a.state=a.state||{},a.state.rowNum||(a.state.rowNum=1);var e=[],s=0,n="",i=!1,l=RegExp.escape(t),u=RegExp.escape(o),c=/(D|S|\n|\r|[^DS\r\n]+)/,f=c.source;return f=(f=f.replace(/S/g,l)).replace(/D/g,u),c=new RegExp(f,"gm"),r.replace(c,function(r){if(!i)switch(s){case 0:if(r===t){n+=r,s=0;break}if(r===o){n+=r,s=1;break}if("\n"===r){d();break}if(/^\r$/.test(r))break;n+=r,s=3;break;case 1:if(r===o){n+=r,s=2;break}n+=r,s=1;break;case 2:var e=n.substr(n.length-1);if(r===o&&e===o){n+=r,s=1;break}if(r===t){n+=r,s=0;break}if("\n"===r){d();break}if("\r"===r)break;throw Error("CSVDataError: Illegal state [Row:"+a.state.rowNum+"]");case 3:if(r===t){n+=r,s=0;break}if("\n"===r){d();break}if("\r"===r)break;if(r===o)throw Error("CSVDataError: Illegal quote [Row:"+a.state.rowNum+"]");throw Error("CSVDataError: Illegal state [Row:"+a.state.rowNum+"]");default:throw Error("CSVDataError: Unknown state [Row:"+a.state.rowNum+"]")}}),""!==n&&d(),e}function d(){if(s=0,a.start&&a.state.rowNum<a.start)return n="",void a.state.rowNum++;if(void 0===a.onParseEntry)e.push(n);else{var r=a.onParseEntry(n,a.state);!1!==r&&e.push(r)}n="",a.end&&a.state.rowNum>=a.end&&(i=!0),a.state.rowNum++}},parseEntry:function(r,e){var a=e.separator,t=e.delimiter;e.state.rowNum||(e.state.rowNum=1),e.state.colNum||(e.state.colNum=1);var o=[],s=0,n="";function i(){if(void 0===e.onParseValue)o.push(n);else{var r=e.onParseValue(n,e.state);!1!==r&&o.push(r)}n="",s=0,e.state.colNum++}if(!e.match){var l=RegExp.escape(a),u=RegExp.escape(t),c=/(D|S|\n|\r|[^DS\r\n]+)/.source;c=(c=c.replace(/S/g,l)).replace(/D/g,u),e.match=new RegExp(c,"gm")}return r.replace(e.match,function(r){switch(s){case 0:if(r===a){n+="",i();break}if(r===t){s=1;break}if("\n"===r||"\r"===r)break;n+=r,s=3;break;case 1:if(r===t){s=2;break}n+=r,s=1;break;case 2:if(r===t){n+=r,s=1;break}if(r===a){i();break}if("\n"===r||"\r"===r)break;throw Error("CSVDataError: Illegal State [Row:"+e.state.rowNum+"][Col:"+e.state.colNum+"]");case 3:if(r===a){i();break}if("\n"===r||"\r"===r)break;if(r===t)throw Error("CSVDataError: Illegal Quote [Row:"+e.state.rowNum+"][Col:"+e.state.colNum+"]");throw Error("CSVDataError: Illegal Data [Row:"+e.state.rowNum+"][Col:"+e.state.colNum+"]");default:throw Error("CSVDataError: Unknown State [Row:"+e.state.rowNum+"][Col:"+e.state.colNum+"]")}}),i(),o}},helpers:{collectPropertyNames:function(r){var e=[],a=[],t=[];for(e in r)for(a in r[e])r[e].hasOwnProperty(a)&&t.indexOf(a)<0&&"function"!=typeof r[e][a]&&t.push(a);return t}},toArray:function(r,e,a){if(void 0!==e&&"function"==typeof e){if(void 0!==a)return console.error("You cannot 3 arguments with the 2nd argument being a function");a=e,e={}}e=void 0!==e?e:{};var t={};t.callback=void 0!==a&&"function"==typeof a&&a,t.separator="separator"in e?e.separator:p.csv.defaults.separator,t.delimiter="delimiter"in e?e.delimiter:p.csv.defaults.delimiter;var o=void 0!==e.state?e.state:{};e={delimiter:t.delimiter,separator:t.separator,onParseEntry:e.onParseEntry,onParseValue:e.onParseValue,state:o};var s=p.csv.parsers.parseEntry(r,e);if(!t.callback)return s;t.callback("",s)},toArrays:function(r,e,a){if(void 0!==e&&"function"==typeof e){if(void 0!==a)return console.error("You cannot 3 arguments with the 2nd argument being a function");a=e,e={}}e=void 0!==e?e:{};var t={};t.callback=void 0!==a&&"function"==typeof a&&a,t.separator="separator"in e?e.separator:p.csv.defaults.separator,t.delimiter="delimiter"in e?e.delimiter:p.csv.defaults.delimiter;var o=[];if(void 0!==(e={delimiter:t.delimiter,separator:t.separator,onPreParse:e.onPreParse,onParseEntry:e.onParseEntry,onParseValue:e.onParseValue,onPostParse:e.onPostParse,start:e.start,end:e.end,state:{rowNum:1,colNum:1}}).onPreParse&&(r=e.onPreParse(r,e.state)),o=p.csv.parsers.parse(r,e),void 0!==e.onPostParse&&(o=e.onPostParse(o,e.state)),!t.callback)return o;t.callback("",o)},toObjects:function(r,e,a){if(void 0!==e&&"function"==typeof e){if(void 0!==a)return console.error("You cannot 3 arguments with the 2nd argument being a function");a=e,e={}}e=void 0!==e?e:{};var t={};t.callback=void 0!==a&&"function"==typeof a&&a,t.separator="separator"in e?e.separator:p.csv.defaults.separator,t.delimiter="delimiter"in e?e.delimiter:p.csv.defaults.delimiter,t.headers="headers"in e?e.headers:p.csv.defaults.headers,e.start="start"in e?e.start:1,t.headers&&e.start++,e.end&&t.headers&&e.end++;var o,s=[];e={delimiter:t.delimiter,separator:t.separator,onPreParse:e.onPreParse,onParseEntry:e.onParseEntry,onParseValue:e.onParseValue,onPostParse:e.onPostParse,start:e.start,end:e.end,state:{rowNum:1,colNum:1},match:!1,transform:e.transform};var n={delimiter:t.delimiter,separator:t.separator,start:1,end:1,state:{rowNum:1,colNum:1},headers:!0};void 0!==e.onPreParse&&(r=e.onPreParse(r,e.state));var i=p.csv.parsers.splitLines(r,n),l=p.csv.toArray(i[0],n);o=p.csv.parsers.splitLines(r,e),e.state.colNum=1,e.state.rowNum=l?2:1;for(var u=0,c=o.length;u<c;u++){for(var f=p.csv.toArray(o[u],e),d={},m=0;m<l.length;m++)d[l[m]]=f[m];void 0!==e.transform?s.push(e.transform.call(void 0,d)):s.push(d),e.state.rowNum++}if(void 0!==e.onPostParse&&(s=e.onPostParse(s,e.state)),!t.callback)return s;t.callback("",s)},fromArrays:function(r,e,a){if(void 0!==e&&"function"==typeof e){if(void 0!==a)return console.error("You cannot 3 arguments with the 2nd argument being a function");a=e,e={}}e=void 0!==e?e:{};var t={};t.callback=void 0!==a&&"function"==typeof a&&a,t.separator="separator"in e?e.separator:p.csv.defaults.separator,t.delimiter="delimiter"in e?e.delimiter:p.csv.defaults.delimiter;var o,s,n,i,l="";for(n=0;n<r.length;n++){for(o=r[n],s=[],i=0;i<o.length;i++){var u=void 0===o[i]||null===o[i]?"":o[i].toString();-1<u.indexOf(t.delimiter)&&(u=u.replace(new RegExp(t.delimiter,"g"),t.delimiter+t.delimiter));var c="\n|\r|S|D";c=(c=c.replace("S",t.separator)).replace("D",t.delimiter),-1<u.search(c)&&(u=t.delimiter+u+t.delimiter),s.push(u)}l+=s.join(t.separator)+"\n"}if(!t.callback)return l;t.callback("",l)},fromObjects:function(r,e,a){if(void 0!==e&&"function"==typeof e){if(void 0!==a)return console.error("You cannot 3 arguments with the 2nd argument being a function");a=e,e={}}e=void 0!==e?e:{};var t={};if(t.callback=void 0!==a&&"function"==typeof a&&a,t.separator="separator"in e?e.separator:p.csv.defaults.separator,t.delimiter="delimiter"in e?e.delimiter:p.csv.defaults.delimiter,t.headers="headers"in e?e.headers:p.csv.defaults.headers,t.sortOrder="sortOrder"in e?e.sortOrder:"declare",t.manualOrder="manualOrder"in e?e.manualOrder:[],t.transform=e.transform,"string"==typeof t.manualOrder&&(t.manualOrder=p.csv.toArray(t.manualOrder,t)),void 0!==t.transform){var o,s=r;for(r=[],o=0;o<s.length;o++)r.push(t.transform.call(void 0,s[o]))}var n,i,l=p.csv.helpers.collectPropertyNames(r);if("alpha"===t.sortOrder&&l.sort(),0<t.manualOrder.length){var u,c=[].concat(t.manualOrder);for(u=0;u<l.length;u++)c.indexOf(l[u])<0&&c.push(l[u]);l=c}var f,d=[];for(t.headers&&d.push(l),n=0;n<r.length;n++){for(i=[],u=0;u<l.length;u++)(f=l[u])in r[n]&&"function"!=typeof r[n][f]?i.push(r[n][f]):i.push("");d.push(i)}return p.csv.fromArrays(d,e,t.callback)}},p.csvEntry2Array=p.csv.toArray,p.csv2Array=p.csv.toArrays,p.csv2Dictionary=p.csv.toObjects,"undefined"!=typeof module&&module.exports&&(module.exports=p.csv)}.call(this);